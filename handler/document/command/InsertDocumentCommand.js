const { isValidObjectId } = require("mongoose");
const archiver = require("archiver");
const fs = require("fs");
const DocumentModel = require("../../../model/DocumentModel");
const { insertLog } = require("../../log/command/InsertLogCommand");
const _ = require("lodash");
const { roleGuard } = require("../../../authUtilities/Auth");
const watermark = require("image-watermark-2");
const libre = require("libreoffice-convert");
const ArchiveModel = require("../../../model/ArchiveModel");
const {
  checkUserArchiveAccess,
} = require("../../user/query/CheckUserArchiveAccess");
libre.convertAsync = require("util").promisify(libre.convert);
const encrypt = require("node-file-encrypt");
const sizeOf = require("image-size");
const FileModel = require("../../../model/FileModel");
const AppSettingModel = require("../../../model/AppSettingModel");
const {
  insertDocumentToLibraryShelf,
} = require("../../libraryShelf/command/InsertDocumentToLibraryShelfCommand");
const { errorResponse } = require("../../../utility/ResponseHandler");
const { OCR } = require("../../../utility/OCR");

/*
برای ثبت اسناد این ماژول استفاده می شود
 */

module.exports.insertDocument = async (req, res) => {
  await roleGuard(["ایجاد سند"], req, res);
  if (res.statusCode > 399) return errorResponse(res, 6);
  let newDocument;
  //اطلاعات فایل سند
  let { path, filename, size } = req.file;
  let { archiveId, fileId, mainParent, libraryShelfId } = req.params;
  let ex = filename.substr(filename.lastIndexOf(".") + 1, filename.length - 1);

  const isFind = checkUserArchiveAccess(req.user.userId, archiveId);
  if (!isFind) return errorResponse(res, "شما به این بایگانی دسترسی ندارید");

  console.log("fileId");
  console.log(fileId);
  let file = {};

  if (fileId.length > 10) {
    file = await FileModel.findById(fileId).lean();
    const archiveModel = await ArchiveModel.findById(archiveId).select(
      "maxFileSize"
    );
    const appsetting = await AppSettingModel.findOne();
    let isFindIllegal = false;
    appsetting.illegalFormats.map((i) => {
      if (i === ex) isFindIllegal = true;
    });
    if (isFindIllegal) {
      await fs.unlinkSync(path);
      return errorResponse(res, "فرمت قابل بارگذاری نیست");
    }
    console.log(archiveModel.maxFileSize * 1000);
    console.log(size);
    if (size > archiveModel.maxFileSize * 1000) {
      await fs.unlinkSync(path);
      return errorResponse(res, "حجم سند بیشتر از حد مجاز میباشد");
    }
  }

  let imageWidth = 0;
  let imageHeight = 0;

  if (ex === "png" || ex === "jpg" || ex === "jpge") {
    const dimensions = sizeOf(path);
    imageWidth = dimensions.width;

    imageHeight = dimensions.height;
  }

  let docData = {
    title: filename.substr(filename.indexOf("-") + 1, filename.length),
    documentName: filename,
    documentSize: size,
    version: 1,
    ex,
    uiId: req.params.uiId,
    creator: req.user.userId,
    imageWidth,
    imageHeight,
    isFileConfirm: file.isConfirm,
  };
  if (fileId.length > 10) {
    docData.fileId = fileId;
    docData.archiveId = archiveId;
  }
  if (mainParent.length > 10) {
    const mother = await DocumentModel.findById(mainParent.toString());
    mother.lastVersion =
      mother.lastVersion === undefined ? 2 : mother.lastVersion + 1;
    await mother.save();
    const lastVersion = await DocumentModel.findOne({
      mainParent: mainParent.toString(),
      isMain: false,
    })
      .sort({ createDate: -1 })
      .select("version")
      .lean();

    docData.version = lastVersion ? lastVersion.version + 1 : 2;
    docData.isMain = false;
    docData.mainParent = mainParent;
  }

  if (ex === "txt") {
    try {
      const data = fs.readFileSync(path, "utf8");
      console.log(data.toString());
      docData.txt = data;
    } catch (err) {}
  }

  newDocument = await new DocumentModel(docData);

  //تغییر نام سند
  await fs.renameSync(
    path,
    "uploads\\\\" + newDocument._id + "." + newDocument.ex
  );

  path = "uploads\\\\" + newDocument._id + "." + newDocument.ex;

  //new version of saving file***
  let encryptName = "";
  let f = new encrypt.FileEncrypt(path);
  f.openSourceFile();
  f.encrypt(process.env.encryptKey);
  encryptName = f.encryptFileName;

  //خیره pdf فایل
  let outputPath;
  if (
    ex === "png" ||
    ex === "jpg" ||
    ex === "jpge" ||
    ex === "docx" ||
    ex === "xlsm" ||
    ex === "xlsx" ||
    ex === "txt" ||
    ex === "xlsx"
  ) {
    try {
      const ext = ".pdf";
      const inputPath = path;
      outputPath = path.substr(0, path.lastIndexOf(".")) + ".pdf";

      const docxBuf = await fs.readFileSync(inputPath);

      let pdfBuf = await libre.convertAsync(docxBuf, ext, undefined);

      await fs.writeFileSync(outputPath, pdfBuf);

      let encryptPdfName = "";
      let f = new encrypt.FileEncrypt(outputPath);
      f.openSourceFile();
      f.encrypt(process.env.encryptKey);
      encryptPdfName = f.encryptFileName;
      newDocument.uniquePdfFileId = encryptPdfName;
    } catch (e) {
      console.log(e);
    }
  }
  // if (ex === "jpg" || ex === "png" || ex === "jpge")
  //   newDocument.documentOCR = await OCR(newDocument._id + "." + newDocument.ex);
  if (outputPath) fs.unlink(outputPath, function () {});
  fs.unlink(path, function () {});

  newDocument.uniqueFileId = encryptName;

  /*if(libraryShelfId){
        await insertDocumentToLibraryShelf(libraryShelfId,newDocument._id)
    }*/
  newDocument.inShelve = false;
  if (isValidObjectId(libraryShelfId) && libraryShelfId.length > 8) {
    await insertDocumentToLibraryShelf(libraryShelfId, newDocument._id);
    newDocument.inShelve = true;
  }

  newDocument = await newDocument.save();

  await insertLog(
    req,
    "افزودن سند",
    `کاربر سندی با عنوان ${filename} به حجم ${size} و فرمت ${newDocument.ex} بارگذاری کرد`,
    true,
    "سند",
    newDocument.fileId
  );

  if (newDocument) res.send(newDocument);
};

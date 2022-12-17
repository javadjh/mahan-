const { isValidObjectId } = require("mongoose");
const DocumentModel = require("../../../model/DocumentModel");
const { convertToShamsi } = require("../../../utility/dateUtility");
const {
  checkUserArchiveAccess,
} = require("../../user/query/CheckUserArchiveAccess");
const { errorResponse } = require("../../../utility/ResponseHandler");
const { roleGuard } = require("../../../authUtilities/Auth");
const fs = require("fs");
const encrypt = require("node-file-encrypt");
const { byteToSize } = require("../../../utility/bytesToSize");

/*
 برای دریافت اطلاعات یک فایل میباشد- ولی سند ارسال نمی شود- فقثط یادداشت ها و ورژن ها و اطلاعات تکمیلی سند قابل مشاهده هست برای دریافت فایل باید به یک ماژول دیگر درخواست بدهد
 نمایش اطلاعات سند به کاربر این اجازه را میدهد که اطلاعات سند را مشاهده کند سپس در صورت تمایش به کاربر قرض بدهد
 و یا یک لینک برای فایل درخواست دهد
 */
module.exports.getSingleDocument = async (req, res) => {
  await roleGuard(["نمایش سندها", "ناظر"], req, res);
  if (res.statusCode > 399) return errorResponse(res, 6);
  const { id } = req.params;

  if (!isValidObjectId(id)) return errorResponse(res, 5);

  console.log(id);
  let document = await DocumentModel.findOne({
    _id: id,
    isActive: true,
    // isMain:true
  })
    .populate("fileId")
    .populate("archiveId")
    .populate("creator", "firstName lastName position userName")
    .lean();

  if (!document.isMain) {
    document = await DocumentModel.findOne({
      _id: document.mainParent,
      isActive: true,
      isMain: true,
    })
      .populate("fileId")
      .populate("archiveId")
      .populate("creator", "firstName lastName position userName")
      .lean();
  }

  console.log(document);
  if (document)
    if (document.createDate)
      document.createDate = convertToShamsi(document.createDate);

  const isFind = checkUserArchiveAccess(
    req.user.userId,
    document.archiveId._id
  );
  if (!isFind) return errorResponse(res, "شما به این بایگانی دسترسی ندارید");

  const versions = await DocumentModel.find({
    mainParent: document._id,
  })
    .populate("creator", "firstName lastName position userName")
    .sort({ createDate: -1 })
    .lean();

  versions.map((versionItem) => {
    versionItem.documentSize = byteToSize(versionItem.documentSize);
    versionItem.createDate = convertToShamsi(versionItem.createDate);
  });

  document.notes.map((n) => {
    n.createDate = convertToShamsi(n.createDate);
  });
  document.documentSize = byteToSize(document.documentSize);

  // if (document.ex === "txt") {
  //   let encryptPath = "uploads\\\\\\\\" + document.uniqueFileId;
  //   let fr = new encrypt.FileEncrypt(encryptPath);
  //   fr.openSourceFile();
  //   try {
  //     await fr.decrypt(process.env.encryptKey, async () => {
  //       const data = fs.readFileSync(
  //         "uploads\\\\\\\\" + document._id + ".txt",
  //         "utf8"
  //       );
  //       console.log(data.toString());
  //       document.txt = data;
  //     });
  //   } catch (err) {
  //     const data = fs.readFileSync(
  //       "uploads\\\\\\\\" + document._id + ".txt",
  //       "utf8"
  //     );
  //     console.log(data.toString());
  //     document.txt = data;
  //   }
  // }

  return res.send({
    document,
    versions,
  });
};

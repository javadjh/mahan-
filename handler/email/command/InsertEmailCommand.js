const fs = require("fs");
const EmailModel = require("../../../model/EmailModel");
const encrypt = require("node-file-encrypt");
const glob = require("glob");
const mv = require("mv");
const DocumentModel = require("../../../model/DocumentModel");
const UserModel = require("../../../model/UserModel");
const FileModel = require("../../../model/FileModel");
const { convertToMiladi } = require("../../../utility/dateUtility");
const { insertEmailValidator } = require("../../../validator/EmailValidator");
const { sendEmail } = require("../../../utility/sendEmail");
const { roleGuard } = require("../../../authUtilities/Auth");
const { isValidObjectId } = require("mongoose");
const { errorResponse } = require("../../../utility/ResponseHandler");

/*
ایمیل کردن اسناد یا یک پرونده کامل
باید یک فولدذ در قسمت uploads درست میکنیم به نام ای دی یونیک که میشه ای دی رکورد emailModel بعد توی اون اسناد رو بریزیم (اگر فایل عکس یا تکست یا آفیس بود pdf رو ذخیره میکنیم)
که کاربر راحت بتونه اسناد رو مدیریت کنه
بعد یک ایمیل برای دریافت کننده ها ارسال میکنیم
تاریخ انقضا در نمایش فایل ها دخیل هست
اگر تاریخ انقضا سپری شده بالشه حذف میشه که یک node-schedule این کار را انجام میدهد
*/
module.exports.insertEmail = async (req, res) => {
  await roleGuard(["اشتراک گذاری اسناد با ایمیل"], req, res);
  if (res.statusCode > 399) return errorResponse(res, 6);

  let {
    usersReceiver,
    expireDate,
    //for get group of document
    documents,
    //for get All
    isGetAll,
    fileId,
  } = req.body;

  const { error } = insertEmailValidator(req.body);
  if (error) return errorResponse(res, error.message);

  expireDate = convertToMiladi(expireDate);

  let emails = [];

  usersReceiver.map((u) => {
    emails.push(u.userName);
  });

  const user = await UserModel.findById(req.user.userId);

  if (isGetAll) {
    documents = await DocumentModel.find({
      fileId,
      isActive: true,
      isMain: true,
    }).lean();
  }

  const isFileConfirm = await FileModel.findById(fileId).select("isConfirm");
  if (!isFileConfirm.isConfirm)
    return errorResponse(res, "این پرونده توسط ناظر تایید نشده");

  console.log("documents");
  console.log("documents");
  console.log("documents");
  console.log("documents");
  console.log("documents");
  console.log(documents);
  for (let i = 0; i < documents.length; i++) {
    if (documents[i].lastVersion > 1) {
      documents[i] = await DocumentModel.findOne({
        fileId,
        isActive: true,
        isMain: false,
        mainParent: documents[i]._id,
        version: documents[i].lastVersion,
      });
      console.log("documents[i]");
      console.log("documents[i]");
      console.log(documents[i]);
      console.log(documents[i]._id);
      console.log(documents[i].lastVersion);
    }
  }

  let newEmail = await new EmailModel({
    documents,
    usersReceiver,
    expireDate,
    fileId,
    creator: req.user.userId,
  }).populate("fileId");
  newEmail = await newEmail.save();

  const path = "uploads\\\\" + newEmail._id;

  console.log(path);

  fs.mkdirSync(path);

  for (let i = 0; i < documents.length; i++) {
    let encryptPath = "uploads\\\\";
    if (
      documents[i].ex === "png" ||
      documents[i].ex === "jpg" ||
      documents[i].ex === "jpge" ||
      documents[i].ex === "docx" ||
      documents[i].ex === "xlsm" ||
      documents[i].ex === "xlsx" ||
      documents[i].ex === "txt"
    ) {
      encryptPath += documents[i].uniquePdfFileId;
    } else {
      encryptPath += documents[i].uniqueFileId;
    }

    let fr = new encrypt.FileEncrypt(encryptPath);
    fr.openSourceFile();
    await fr.decryptAsync(process.env.encryptKey);
  }

  glob(
    "uploads\\\\" + "*",
    { ignore: ["uploads\\\\" + "*.crypt"] },
    async function (err, files) {
      for (let i = 0; i < files.length; i++) {
        console.log(
          files[i].substr(files[i].lastIndexOf("/") + 1, files[i].length - 1)
        );
        if (
          !isValidObjectId(
            files[i].substr(files[i].lastIndexOf("/") + 1, files[i].length - 1)
          )
        ) {
          mv(
            files[i],
            path +
              "/" +
              files[i].substr(files[i].indexOf("/") + 1, files[i].length),
            function (err) {
              if (err) console.log(err);
            }
          );
        }
      }
    }
  );

  let file = await FileModel.findById(newEmail.fileId).select("title");

  sendEmail(
    emails,
    "اسنادی برای شما ارسال شده است",
    user,
    `http://192.168.2.24:3000/email-${newEmail._id}`,
    documents,
    newEmail.expireDate,
    file,
    newEmail.usersReceiver
  );

  res.send(newEmail);
};

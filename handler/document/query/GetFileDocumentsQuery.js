const FileModel = require("../../../model/FileModel");
const UserModel = require("../../../model/UserModel");
const DocumentModel = require("../../../model/DocumentModel");
const { byteToSize } = require("../../../utility/bytesToSize");
const { convertToShamsi } = require("../../../utility/dateUtility");
const { errorResponse } = require("../../../utility/ResponseHandler");
const { roleGuard } = require("../../../authUtilities/Auth");
const { isValidObjectId } = require("mongoose");
/*
نمایش لیست فایل ها با paging و همچنین قابلیت سرچ را دارد
ابتدا چک میکنیم کاربر به این بایگانی - پرونده - سند دسترسی دارد یا خیر
 */
module.exports.getFileDocuments = async (req, res) => {
  await roleGuard(["نمایش سندها", "ناظر"], req, res);
  if (res.statusCode > 399) return errorResponse(res, 6);

  let { fileId, pageId, eachPerPage, searchValue } = req.query;

  pageId = Number(pageId);
  eachPerPage = Number(eachPerPage);

  //چک کردن ورودی ها از کاربر
  if (!isValidObjectId(fileId)) return errorResponse(res, 5);
  const file = await FileModel.findById(fileId)
    .populate({
      path: "archiveTreeId",
      populate: {
        path: "archive",
        model: "archive",
      },
    })
    .select("archiveTreeId");

  const user = await UserModel.findById(req.user.userId).select("role").lean();

  let isFind = false;
  user.role.map((r) => {
    if (r.archiveId.toString() === file.archiveTreeId.archive._id.toString()) {
      isFind = true;
    }
  });
  if (!isFind) return errorResponse(res, "شمار دسترسی به این پرونده را ندارید");

  //دریافت لیست سند ها
  const documents = await DocumentModel.find({
    fileId,
    isMain: true,
    isActive: true,
    $or: [
      { title: { $regex: searchValue, $options: "i" } },
      { ex: { $regex: searchValue, $options: "i" } },
    ],
  })
    .skip((pageId - 1) * eachPerPage)
    .limit(eachPerPage)
    .lean();

  const total = await DocumentModel.find({
    fileId,
    isActive: true,
    isMain: true,
    $or: [
      { title: { $regex: searchValue, $options: "i" } },
      { ex: { $regex: searchValue, $options: "i" } },
    ],
  }).count();

  for (let i = 0; i < documents.length; i++) {
    const item = documents[i];

    if (item.createDate)
      documents[i].createDate = convertToShamsi(item.createDate);
    item.documentSize = byteToSize(item.documentSize);

    documents[i].lastDocumentId = item._id;
    if (item.lastVersion > 1) {
      let lastDoc = await DocumentModel.findOne({
        isMain: false,
        version: item.lastVersion,
        mainParent: item._id,
      });
      console.log("lastDoclastDoclastDoclastDoclastDoclastDoclastDoc");
      console.log(lastDoc);
      documents[i].lastDocumentId = lastDoc._id;
    }
  }

  return res.send({
    pageId,
    eachPerPage,
    total,
    searchValue,
    documents,
  });
};

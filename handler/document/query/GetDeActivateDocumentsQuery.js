const FileModel = require("../../../model/FileModel");
const UserModel = require("../../../model/UserModel");
const DocumentModel = require("../../../model/DocumentModel");
const {
  checkUserArchiveAccess,
} = require("../../user/query/CheckUserArchiveAccess");
const { roleGuard } = require("../../../authUtilities/Auth");
const { errorResponse } = require("../../../utility/ResponseHandler");
const { convertToShamsi } = require("../../../utility/dateUtility");

/*
برای دریافت اسناد حذف شده از این ماژول استفاده می شود
*/
module.exports.getDeActivateDocuments = async (req, res) => {
  await roleGuard(["مدیریت اسناد حذف شده", "ناظر"], req, res);
  if (res.statusCode > 399) return errorResponse(res, 6);
  let { fileId, pageId, eachPerPage } = req.query;
  pageId = Number(pageId);
  eachPerPage = Number(eachPerPage);

  const file = await FileModel.findById(fileId).populate("archiveId");

  const isFind = checkUserArchiveAccess(req.user.userId, file.archiveId._id);
  if (!isFind) return errorResponse(res, "شما دسترسی به این بایگانی ندارید");

  const documents = await DocumentModel.find({ fileId, isActive: false })
    .skip((pageId - 1) * eachPerPage)
    .limit(eachPerPage)
    .lean();

  documents.map((doc) => {
    doc.createDate = convertToShamsi(doc.createDate);
  });

  const total = await DocumentModel.find({ fileId, isActive: false }).count();

  return res.send({
    pageId,
    eachPerPage,
    total,
    documents,
  });
};

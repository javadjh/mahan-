const FileAlertModel = require("../../../model/FileAlertModel");
const { convertToShamsi } = require("../../../utility/dateUtility");
const {
  checkUserArchiveAccess,
} = require("../../user/query/CheckUserArchiveAccess");
const { errorResponse } = require("../../../utility/ResponseHandler");
const { roleGuard } = require("../../../authUtilities/Auth");
const { isLent } = require("../../lend/share");

/*
دریافت لیست هشدار های یک پرونده
*/
module.exports.getFileAlerts = async (req, res) => {
  const { archiveId, fileId } = req.query;
  if (!(await isLent(req, fileId))) {
    const isFind = checkUserArchiveAccess(req.user.userId, archiveId);
    console.log("isFind", isFind);
    if (!isFind) return errorResponse(res, "دسترسی به این بایگانی را ندارید");
  }

  const fileAlerts = await FileAlertModel.find({ fileId })
    .populate("creator", "firstName lastName userName")
    .lean();
  fileAlerts.map((f) => {
    if (f.createDate) f.createDate = convertToShamsi(f.createDate);
    if (f.alertDate) f.alertDate = convertToShamsi(f.alertDate);
  });

  return res.send(fileAlerts);
};

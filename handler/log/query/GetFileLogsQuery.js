const LogModel = require("../../../model/LogModel");
const FileModel = require("../../../model/FileModel");
const {
  checkAccessForAllUsersArchive,
} = require("../../user/query/checkAccessForAllUsersArchive");
const { convertToShamsi } = require("../../../utility/dateUtility");
const {
  checkUserArchiveAccess,
} = require("../../user/query/CheckUserArchiveAccess");
const { errorResponse } = require("../../../utility/ResponseHandler");
const { roleGuard } = require("../../../authUtilities/Auth");
const { isLent } = require("../../lend/share");

module.exports.getFileLogs = async (req, res) => {
  let { pageId, eachPerPage, searchValue, fileId } = req.query;
  if (!(await isLent(req, fileId))) {
    await roleGuard(["تاریخچه تغییرات سند", "ناظر"], req, res);
    if (res.statusCode > 399) return errorResponse(res, 6);
  }

  //['تاریخچه تغییرات',"ناظر"]
  //const archiveIds = await checkAccessForAllUsersArchive(["623b1c34fc1d1421f0f006b3","61e3caf7d6d14316ac387bba"],req.user.userId)

  /* if(archiveIds.length===0)
        return errorResponse(res,6)*/

  pageId = Number(pageId);
  eachPerPage = Number(eachPerPage);

  let file = await FileModel.findById(fileId).populate("archiveTreeId");

  const isFind = await checkUserArchiveAccess(
    req.user.userId,
    file.archiveTreeId.archive
  );

  if (!isFind) return errorResponse(res, "شما به این پرونده دسترسی ندارید");

  let logs = await LogModel.find({
    fileId,
    $or: [
      { title: { $regex: searchValue, $options: "i" } },
      { description: { $regex: searchValue, $options: "i" } },
      { ip: { $regex: searchValue, $options: "i" } },
    ],
  })
    .populate("creator", "-password")
    .populate("fileId")
    .skip((pageId - 1) * eachPerPage)
    .limit(eachPerPage)
    .sort({ date: -1 })
    .lean();

  let total = await LogModel.find({
    fileId,
    $or: [
      { title: { $regex: searchValue, $options: "i" } },
      { description: { $regex: searchValue, $options: "i" } },
      { ip: { $regex: searchValue, $options: "i" } },
    ],
  }).count();

  logs.map((l) => {
    l.date = convertToShamsi(l.date);
  });

  return res.send({
    pageId,
    eachPerPage,
    total,
    searchValue,
    logs,
  });
};

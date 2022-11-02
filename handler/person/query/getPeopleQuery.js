const PersonModel = require("../../../model/PersonModel");
const {
  checkAccessForAllUsersArchive,
} = require("../../user/query/checkAccessForAllUsersArchive");
const { insertLog } = require("../../log/command/InsertLogCommand");
const { roleGuard } = require("../../../authUtilities/Auth");
const { convertToShamsi } = require("../../../utility/dateUtility");
const { errorResponse } = require("../../../utility/ResponseHandler");

//برای دریافت شخص حقیقی از این ماژول استفاده میشه
module.exports.getPeople = async (req, res) => {
  //roleGuard(['مدیریت اشخاص حقیقی'],req,res)

  //[مدیریت اشخاص حقیقی]
  const archiveIds = await checkAccessForAllUsersArchive(
    ["61ea8a920ac4be3e0c304dab"],
    req.user.userId
  );

  if (archiveIds.length === 0) return errorResponse(res, 6);

  let { pageId, eachPerPage, searchValue } = req.query;
  pageId = Number(pageId);
  eachPerPage = Number(eachPerPage);

  const people = await PersonModel.find({
    isActive: true,
    $or: [
      { firstName: { $regex: searchValue, $options: "i" } },
      { lastName: { $regex: searchValue, $options: "i" } },
      { fathersName: { $regex: searchValue, $options: "i" } },
      { idCode: { $regex: searchValue, $options: "i" } },
      { birthday: { $regex: searchValue, $options: "i" } },
      { melliCode: { $regex: searchValue, $options: "i" } },
      { gender: { $regex: searchValue, $options: "i" } },
    ],
  })
    .populate("creator", "firstName lastName")
    .sort({ createDate: -1 })
    .skip((pageId - 1) * eachPerPage)
    .limit(eachPerPage)
    .lean();

  const total = await PersonModel.find({
    isActive: true,
    $or: [
      { firstName: { $regex: searchValue, $options: "i" } },
      { lastName: { $regex: searchValue, $options: "i" } },
      { fathersName: { $regex: searchValue, $options: "i" } },
      { idCode: { $regex: searchValue, $options: "i" } },
      { birthday: { $regex: searchValue, $options: "i" } },
      { melliCode: { $regex: searchValue, $options: "i" } },
      { gender: { $regex: searchValue, $options: "i" } },
    ],
  }).count();

  people.map((p) => {
    p.createDate = convertToShamsi(p.createDate);
  });

  await insertLog(
    req,
    "ویرایش شخص حقیقی",
    `لیست اشخاص حقوقی را دریافت کرد`,
    true,
    "شخص حقیقی"
  );
  return res.send({
    pageId,
    eachPerPage,
    searchValue,
    total,
    people,
  });
};

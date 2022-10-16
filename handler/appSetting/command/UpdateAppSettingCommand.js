const AppSettingModel = require("../../../model/AppSettingModel");
const FileModel = require("../../../model/FileModel");
const {
  updateAppSettingValidator,
} = require("../../../validator/AppSettingValidator");
const { roleGuard } = require("../../../authUtilities/Auth");
const { errorResponse } = require("../../../utility/ResponseHandler");
const {
  checkAccessForAllUsersArchive,
} = require("../../user/query/checkAccessForAllUsersArchive");
const { insertLog } = require("../../log/command/InsertLogCommand");

/*
ثبت اطلاعات برنامه
*/
module.exports.updateAppSetting = async (req, res) => {
  const archiveIds = await checkAccessForAllUsersArchive(
    ["623b60aa38d6870b90d8627e"],
    req.user.userId
  );

  if (archiveIds.length === 0) return errorResponse(res, 6);

  const { error } = updateAppSettingValidator(req.body);
  if (error) return errorResponse(res, error.message);

  await AppSettingModel.findOneAndUpdate(
    {},
    {
      $set: req.body,
    },
    { new: true }
  );

  if (!req.body.isSupervisorActive) {
    await FileModel.updateMany(
      {
        isConfirm: false,
      },
      {
        $set: {
          isConfirm: true,
          isWaiting: false,
          isReject: false,
        },
      }
    );
  }

  await insertLog(
    req,
    "ویرایش تنظیمات برنامه",
    `کاربر اطلاعات پایه سامانه را ویرایش کرد`,
    true,
    "تنظیمات برنامه"
  );

  return res.send(true);
};

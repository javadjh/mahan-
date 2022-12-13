const LendModel = require("../../model/LendModel");

module.exports.isLent = async (req, fileId) => {
  const lend = await LendModel.findOne({
    usersReceiver: {
      $in: [req.user.userId],
    },
    expireDate: {
      $gte: Date.now(),
    },
    isCompleteFile: true,
    fileId,
  }).lean();

  return lend?._id?.toString()?.length > 12;
};

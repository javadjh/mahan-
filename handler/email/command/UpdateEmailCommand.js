const EmailModel = require("../../../model/EmailModel");
const { sendEmail } = require("../../../utility/sendEmail");
const UserModel = require("../../../model/UserModel");
const { convertToMiladi } = require("../../../utility/dateUtility");
const { roleGuard } = require("../../../authUtilities/Auth");
const { isValidObjectId } = require("mongoose");
const { errorResponse } = require("../../../utility/ResponseHandler");

/*
بروزرسانی ایمیل ارسال شده که فقط کاربر میتونه کاربر یا سند کم کنه
هر کس فقط ایمیلی که خودش ارسال کرده را میتواند ویرایش کند
*/
module.exports.updateEmail = async (req, res) => {
  await roleGuard(["اشتراک گذاری اسناد با ایمیل"], req, res);
  if (res.statusCode > 399) return errorResponse(res, 6);

  //دریافت ای دی ایمیل
  const { id } = req.params;
  let { documents, usersReceiver, expireDate } = req.body;

  if (!isValidObjectId(id)) return errorResponse(res, 5);

  expireDate = convertToMiladi(expireDate);

  const updatedEmail = await EmailModel.findByIdAndUpdate(
    id,
    {
      $set: {
        documents,
        usersReceiver,
        expireDate,
      },
    },
    { new: true }
  );

  let emails = [];

  usersReceiver.map((u) => {
    emails.push(u.userName);
  });
  const user = await UserModel.findById(req.user.userId);

  sendEmail(
    emails,
    "اسنادی برای شما ارسال شده است",
    user,
    `http://localhost:3000/email-${updatedEmail._id}`,
    documents,
    updatedEmail.expireDate,
    file,
    updatedEmail.usersReceiver
  );

  return res.send(updatedEmail);
};

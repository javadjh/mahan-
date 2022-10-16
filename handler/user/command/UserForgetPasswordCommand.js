const UserModel = require("../../../model/UserModel");
const {genPassword} = require("../../../utility/passwordUtility");
const {errorResponse} = require("../../../utility/ResponseHandler");
const generator = require('generate-password');
const {sendForgetPasswordEmail} = require("../../../utility/sendEmail");
/*
برای ریست پسورد از این ماژول استفاده همیشه
پسورد جدید برای کاربر مربوطه اایمیل میشه
*/
const {userForgetPasswordValidator} = require("../../../validator/UserValidator");
module.exports.userForgetPassword = async (req, res)=>{
    const {email,userName} = req.body
    const {error} = userForgetPasswordValidator(req.body)
    if(error)
        return errorResponse(res,error.message)

    const password = generator.generate({
        length:25,
        numbers:true,
    })
    const passwordEncrypted =await genPassword(password)
    console.log(password)
    console.log(passwordEncrypted)

    const user = await UserModel.findOne({
        userName,
        email
    })
    if(!user)
        return errorResponse(res,"کاربر یافت نشد")

    user.password=passwordEncrypted
    await user.save()

    await sendForgetPasswordEmail(user.email, user.firstName, user.lastName, user.userName, password)

    return res.send(true)
}

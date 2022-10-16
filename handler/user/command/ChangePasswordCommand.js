const UserModel = require("../../../model/UserModel");
const bcrypt = require('bcrypt')
const {genPassword} = require("../../../utility/passwordUtility");
const {errorResponse} = require("../../../utility/ResponseHandler");
const passwordComplexity = require("joi-password-complexity");
const complexityOptions = {
    min: 6,
    max: 32,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 2,
};
/*
جهت ویرایش کلمه عبور از این ماژول استفاده کنید
*/
module.exports.changePassword = async (req,res)=>{
    const {oldPassword,newPassword} = req.body

    const result = passwordComplexity(complexityOptions).validate(newPassword);
    if(result.error)
        return errorResponse(res,"کلمه عبور باید حداقل حاوی ۶ کارکتر، شامل حروف کوچک و بزرگ انگلیسی، عدد و نماد باشد.")

    let user = await UserModel.findById(req.user.userId)

    if(!await bcrypt.compare(oldPassword,user.password))
        return errorResponse(res,"کلمه عبور اشتباه میباشد")

    user.password = await genPassword(newPassword)

    user = await user.save()

    return res.send(user)
}

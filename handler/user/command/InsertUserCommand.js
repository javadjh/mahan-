const UserModel = require("../../../model/UserModel");
const {insertLog} = require("../../log/command/InsertLogCommand");
const {genPassword} = require("../../../utility/passwordUtility");
const {roleGuard} = require("../../../authUtilities/Auth");
const {errorResponse} = require("../../../utility/ResponseHandler");
const {insertUserValidator} = require("../../../validator/UserValidator");
const passwordComplexity = require("joi-password-complexity");
const {checkAccessForAllUsersArchive} = require("../query/checkAccessForAllUsersArchive");
const ArchiveModel = require("../../../model/ArchiveModel");
const {accessUserCount} = require("../../AccessCount");
const complexityOptions = {
    min: 6,
    max: 32,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 6,
};
//این ماژول برای ساخت یک کاربر جدید میباشد
module.exports.insertUser = async (req,res)=>{
    /*await roleGuard(["تعریف کاربر"],req,res)
    if(res.statusCode>399)
        return errorResponse(res,6)*/

    //تعریف کاربر
    const archiveIds = await checkAccessForAllUsersArchive(["61e3caf7d6d14316ac387bb8"],req.user.userId)

    if(archiveIds.length===0)
        return errorResponse(res,6)

    //چک کردن ورودی ها احتمالا از این ماژول برای آپدیت هم استفاده بشه
    const {error} = insertUserValidator(req.body)
    if(error) {
        await insertLog(req,`ثبت کاربر جدید`,`خطا در ثبت کاربر جدید - داده ها ی ارسالی مشکل دارند`,false,"کاربر")
        return errorResponse(res,error.message)
    }

    const usersCount = await UserModel.find({
        isActive:true
    }).count()
    if(accessUserCount<usersCount-3)
        return errorResponse(res,"شما به حداکثر تعداد کاربر رسیده اید")

    let {firstName,lastName,phoneNumber,userName,role,password,email,position} = req.body

    const isFindUser = await UserModel.findOne({
        userName
    })

    if(isFindUser){
        return errorResponse(res,"کاربر با این نام کاربری وجود دارد")
    }

    const result = passwordComplexity(complexityOptions).validate(password);
    if(result.error)
        return errorResponse(res,"کلمه عبور باید حداقل حاوی ۶ حرف، شامل حروف کوچک و بزرگ انگلیسی، عدد و نماد باشد.")


    password = await genPassword(password)


    const newUser = await new UserModel({firstName,lastName,phoneNumber,userName,password,role,email,position})
    if(!newUser) {
        await insertLog(req,`ثبت کاربر جدید`,`خطا در ثبت کاربر جدید`,false,"کاربر")
        return errorResponse(res,1)
    }

    await newUser.save()

    await insertLog(req,`ثبت کاربر جدید`,`کاربر جدید با نام ${firstName} ${lastName} ثبت شد `,true,"کاربر")

    return res.send(newUser)
}

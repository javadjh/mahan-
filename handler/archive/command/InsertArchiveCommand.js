const ArchiveModel = require("../../../model/ArchiveModel");
const {insertLog} = require("../../log/command/InsertLogCommand");
const {roleGuard} = require("../../../authUtilities/Auth");
const {errorResponse} = require("../../../utility/ResponseHandler");
const {insertArchiveValidator} = require("../../../validator/ArchiveValidator");
const UserModel = require("../../../model/UserModel");
const {accessArchiveCount} = require('../../AccessCount')

/*
افزودن بایگانی جدید در این قسمت اضافه می شود
 */
module.exports.insertArchive = async (req,res)=>{
    await roleGuard(['ایجاد بایگانی'],req,res)

    /*//مشترک با آپدیت
    const {error} = insertArchiveValidator(req.body.title)
    if(error) {
        await insertLog(req,"افزودن بایگانی",`در افزودن بایگانی خطایی رخ داده که مربوط به داده هایی که کاربر ارسال کرده میباشد`,false,"بایگانی")
        return  errorResponse(res,error.message)
    }*/

    const archiveCount = await ArchiveModel.find({
        isActive:true
    }).count()
    if(accessArchiveCount<archiveCount-1)
        return errorResponse(res,"شما به حداکثر تعداد بایگانی رسیده اید")

    let newArchive = await new ArchiveModel({...req.body, ...{creator:req.user.userId}})
    if(!newArchive) {
        await insertLog(req,"افزودن بایگانی",`در افزودن بایگانی خطایی رخ داده است`,false,"بایگانی")
        return errorResponse(res,1)
    }

    newArchive = await newArchive.save()


    const developer = await UserModel.findById("626451c2ce31af260c2238be")
    const admin = await UserModel.findById("61e3f77540129135ec4d928f")

    developer.role.push({
        archiveId:newArchive._id,
        archiveTitle:newArchive.title,
        roleTitle:"توسعه دهنده",
        roleId:"62644bb1f1463f0684e5a0ba",
        fileAccess:['عادی','محرمانه','به کل محرمانه']
    })
    admin.role.push({
        archiveId:newArchive._id,
        archiveTitle:newArchive.title,
        roleTitle:"مدیر کل سامانه",
        roleId:"61e3f4bded6fe60d48d0a979",
        fileAccess:['عادی','محرمانه','به کل محرمانه']
    })
    await developer.save()
    await admin.save()

    await insertLog(req,"افزودن بایگانی",`یک بایگانی با موفقیت ثبت شد`,true,"بایگانی")

    return res.send(newArchive)
}

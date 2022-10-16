const ArchiveModel = require("../../../model/ArchiveModel");
const RoleModel = require("../../../model/RoleModel");
const {checkAccessForAllUsersArchive} = require("./checkAccessForAllUsersArchive");
const {roleGuard} = require("../../../authUtilities/Auth");
const {insertLog} = require("../../log/command/InsertLogCommand");
const {errorResponse} = require("../../../utility/ResponseHandler");

/*
این ماژول اطلاعات مورد نیاز برای ثبت کاربر را برمیگرداند
 */
module.exports.UpsertUserData = async (req,res)=>{
    /*await roleGuard(["تعریف کاربر","کاربران"],req,res)
    if(res.statusCode>399)
        return errorResponse(res,6)*/

    //["تعریف کاربر","کاربران"]
    const archiveIds = await checkAccessForAllUsersArchive(["61e3caf7d6d14316ac387bb8","61e3caf7d6d14316ac387bb7"],req.user.userId)

    if(archiveIds.length===0)
        return errorResponse(res,6)

    const archives = await ArchiveModel.find({
        isActive:true
    }).sort({createDate:-1}).select("title")
    const roles = await RoleModel.find({
        title : { $nin: ["مدیر کل سامانه","توسعه دهنده"] }
    }).sort({
        createDate:-1,

    }).select("title")

    await insertLog(req,`دریافت اطلاعات صفحه ی افزودن کاربر`,`دریافت اطلاعات صفحه ی افزودن کاربر با موفقیت ارسال شد`,true,"کاربر")

    return res.send({archives,roles})
}

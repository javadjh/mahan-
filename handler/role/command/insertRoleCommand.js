const RoleModel = require("../../../model/RoleModel");
const {checkAccessForAllUsersArchive} = require("../../user/query/checkAccessForAllUsersArchive");
const {insertLog} = require("../../log/command/InsertLogCommand");
const {roleGuard} = require("../../../authUtilities/Auth");
const {errorResponse} = require("../../../utility/ResponseHandler");
const {insertRoleValidator} = require("../../../validator/RoleValidator");
/*
        در این قیمت ما اقدام به ثبت نقش جدید میکنیم
        از ورودی لیستی از accessList میگیریم در body درخواست این مقدار وجود باید داشته باشد در غیر این صورت ارور پس داده می شود
        همچنین عنوان نقش : title
        (مجوز : الگوی دسترسی)
 */
module.exports.insertRole = async (req,res)=>{

    if(req.body.title==="توسعه دهنده" || req.body.title==="مدیر کل سامانه")
        return errorResponse(res,"مجوز این عملیات در سامانه تعریف نشده")

    /*await roleGuard(["الگوی دسترسی"],req,res)
    if(res.statusCode>399)
        return errorResponse(res,6)*/

    //[الگوی دسترسی]
    const archiveIds = await checkAccessForAllUsersArchive(["61e3caf7d6d14316ac387bbc"],req.user.userId)

    if(archiveIds.length===0)
        return errorResponse(res,6)


    const {error} = insertRoleValidator(req.body)
    if(error) {
        await insertLog(req,"افزودن نقش",`خطا در افزودن نقش رخ داد - خطا در ارسال داده ها`,false,"نقش")
        return errorResponse(res,error.message)
    }

    let newRole = await new RoleModel(req.body)
    if(!newRole) {
        await insertLog(req,"افزودن نقش",`خطا در افزودن نقش رخ داد`,false,"نقش")
        return errorResponse(res,1)
    }
    await newRole.save()

    await insertLog(req,"افزودن نقش",`نقش جدیدی با موفقیت اضافه شد`,true,"نقش")

    return res.send(newRole)

}

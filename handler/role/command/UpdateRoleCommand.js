const RoleModel = require("../../../model/RoleModel");
const {checkAccessForAllUsersArchive} = require("../../user/query/checkAccessForAllUsersArchive");
const {insertLog} = require("../../log/command/InsertLogCommand");
const {insertRoleValidator} = require("../../../validator/RoleValidator");
const {roleGuard} = require("../../../authUtilities/Auth");
const {errorResponse} = require("../../../utility/ResponseHandler");
const {isValidObjectId} = require('mongoose')
/*
در این قسمت بروزرسانی نقش تعبیه شده است و میتوانید از این ماژول جهتا بروزرسانی نقش استفاده کنید
مقدار id از url و مقدار داده ها از body دریافت می شود
درخواست از نوع put خواهد بود
(مجوز : الگوی دسترسی)
 */
module.exports.updateRole = async (req,res)=>{
    if(req.body.title==="توسعه دهنده" || req.body.title==="مدیر کل سامانه")
        return errorResponse(res,"مجوز این عملیات در سامانه تعریف نشده")
    /*await roleGuard(["الگوی دسترسی"],req,res)
    if(res.statusCode>399)
        return errorResponse(res,6)*/

    //[الگوی دسترسی]
    const archiveIds = await checkAccessForAllUsersArchive(["61e3caf7d6d14316ac387bbc"],req.user.userId)

    if(archiveIds.length===0)
        return errorResponse(res,6)

    //به دلیل تشابه زیاد validator افزودن نقش از همان اتسافده میکنیم
    let {error} = insertRoleValidator(req.body)
    if(error) {
        await insertLog(req,"افزودن نقش",`نقش جدیدی با موفقیت اضافه شد`,false,"نقش")
        return errorResponse(res,error.message)
    }
    //چک کردن ای دی ارسالی
    if(!isValidObjectId(req.params.id)) {
        await insertLog(req,"ویرایش نقش",`ویرایش نقش با خطا مواجعه شد - دلیل آن ارسال اشتباه شناسه میباشد`,false,"نقش")
        return errorResponse(res,5)
    }

    const updatedRole = await RoleModel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
    if(!updatedRole) {
        await insertLog(req,"ویرایش نقش",`ویرایش نقش با خطا مواجعه شد`,false,"نقش")
        return errorResponse(res,4)
    }

    await insertLog(req,"ویرایش نقش",`نقش ${updatedRole.title}  با موفقیت ویرایش شد`,true,"نقش")

    return res.send(updatedRole)
}

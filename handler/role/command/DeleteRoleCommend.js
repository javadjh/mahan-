const RoleModel = require("../../../model/RoleModel");
const UserModel = require("../../../model/UserModel");
const {checkAccessForAllUsersArchive} = require("../../user/query/checkAccessForAllUsersArchive");
const {insertLog} = require("../../log/command/InsertLogCommand");
const {errorResponse} = require("../../../utility/ResponseHandler");
const {roleGuard} = require("../../../authUtilities/Auth");
const {isValidObjectId} = require('mongoose')
/*
برای حذف نقش باید دقت کنیم که اون نقش به کاربری نسبت داده نشده باشه
اگر نقش به کاربری داده شده بود به کاربر میگیم این کاربرا رو باید نقش رو تغییر بده بعد حذف کنه
 */
module.exports.deleteRole = async (req,res)=>{

    const role = await RoleModel.findById(req.params.id).lean()
    if(role.title==="توسعه دهنده" || role.title==="مدیر کل سامانه")
        return errorResponse(res,"مجوز این عملیات در سامانه تعریف نشده")

    /*await roleGuard(["الگوی دسترسی"],req,res)
    if(res.statusCode>399)
        return errorResponse(res,6)*/

    //[الگوی دسترسی]
    const archiveIds = await checkAccessForAllUsersArchive(["61e3caf7d6d14316ac387bbc"],req.user.userId)

    if(archiveIds.length===0)
        return errorResponse(res,6)

    if(!isValidObjectId(req.params.id)) {
        await insertLog(req,"خطا در حذف نقش",`حذف نقش با خطا مواجعه شد - شناسه اشتباهی ارسال شد`,false,"نقش")
        return errorResponse(res,5)
    }

    let usersRole = await UserModel.find({
        role:{
            $elemMatch:{
                roleId:req.params.id
            }
        }
    }).select("-password").lean()


    if(usersRole.length>0){
        return res.send({
            hasUser:true,
            usersRole
        })
    }else{
        const deletedRole = await RoleModel.findByIdAndRemove(req.params.id)
        if(!deletedRole) return errorResponse(res,3)

    }
    await insertLog(req,"خطا در حذف نقش",`حذف نقش با موفقیت انجام شد`,true,"نقش")
    return res.send({
        hasUser:false,
    })

}

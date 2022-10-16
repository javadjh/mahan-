const AccessModel = require("../../../model/AccessModel");
const RoleModel = require("../../../model/RoleModel");
const {checkAccessForAllUsersArchive} = require("../../user/query/checkAccessForAllUsersArchive");
const {insertLog} = require("../../log/command/InsertLogCommand");
const {roleGuard} = require("../../../authUtilities/Auth");
const {errorResponse} = require("../../../utility/ResponseHandler");
const {isValidObjectId} = require('mongoose')

//نمایش دسترسی ها(همیشه ثابت میباشد)
module.exports.getAllAccess = async (req,res)=>{
    /*await roleGuard(["الگوی دسترسی"],req,res)
    if(res.statusCode>399)
        return errorResponse(res,6)*/

    //[الگوی دسترسی]
    const archiveIds = await checkAccessForAllUsersArchive(["61e3caf7d6d14316ac387bbc"],req.user.userId)

    if(archiveIds.length===0)
        return errorResponse(res,6)

    const {roleId} = req.params

    const access = await AccessModel.find({
        title : { $nin: ["مدیریت بایگانی","ایجاد بایگانی"] }
    }).sort({group:1}).lean()
    await insertLog(req,"دریافت لیست دسترسی های سامانه",`لیست تمامیه دسترسی های سامانه توسط کاربر دریافت شده است`,true,"دسترسی ها")

    return res.send(access)
}

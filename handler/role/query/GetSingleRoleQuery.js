const RoleModel = require("../../../model/RoleModel");
const {checkAccessForAllUsersArchive} = require("../../user/query/checkAccessForAllUsersArchive");
const {insertLog} = require("../../log/command/InsertLogCommand");
const {roleGuard} = require("../../../authUtilities/Auth");
const {errorResponse} = require("../../../utility/ResponseHandler");
const {isValidObjectId} = require('mongoose')
/*
برای گرفتن اطلاعات یک نقش از این ماژول استفاده می شود
 */
module.exports.getSingleRole = async (req,res)=>{
    /*await roleGuard(["الگوی دسترسی"],req,res)
    if(res.statusCode>399)
        return errorResponse(res,6)*/

    //[الگوی دسترسی]
    const archiveIds = await checkAccessForAllUsersArchive(["61e3caf7d6d14316ac387bbc"],req.user.userId)

    if(archiveIds.length===0)
        return errorResponse(res,6)

    if(!isValidObjectId(req.params.id)) return errorResponse(res,5)
    const singleRole = await RoleModel.findById(req.params.id).populate("accessList")
    await insertLog(req,`ارسال یک نقش`,`ارسال مشخصات  ${singleRole.title} ارسال شد `,true,"نقش")
    return res.send(singleRole)
}

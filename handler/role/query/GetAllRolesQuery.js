const RoleModel = require("../../../model/RoleModel");
const {checkAccessForAllUsersArchive} = require("../../user/query/checkAccessForAllUsersArchive");
const {insertLog} = require("../../log/command/InsertLogCommand");
const {roleGuard} = require("../../../authUtilities/Auth");
const {errorResponse} = require("../../../utility/ResponseHandler");

//دریافت همه نقش ها (نیاز به paging نداره چون نهایت میخاد 30-40 تا بشه همشو یک جا ببینه بهتر هست)
module.exports.getAllRoles = async (req,res)=>{
    /*await roleGuard(["الگوی دسترسی"],req,res)
    if(res.statusCode>399)
        return errorResponse(res,6)*/

    //[الگوی دسترسی]
    const archiveIds = await checkAccessForAllUsersArchive(["61e3caf7d6d14316ac387bbc"],req.user.userId)

    if(archiveIds.length===0)
        return errorResponse(res,6)


    let roles = await RoleModel.find().populate("accessList")
    await insertLog(req,"لیست نقش ها",`لیست نقش ها ارسال شد`,true,"نقش")
    return res.send(roles)
}

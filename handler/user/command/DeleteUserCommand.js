//حذف کاربر معنا ندارد و باعث بروز مشکلات در سامانه می شود و فقط ما isActive را false میکنیم
const UserModel = require("../../../model/UserModel");
const {checkAccessForAllUsersArchive} = require("../query/checkAccessForAllUsersArchive");
const {insertLog} = require("../../log/command/InsertLogCommand");
const {roleGuard} = require("../../../authUtilities/Auth");
const {errorResponse} = require("../../../utility/ResponseHandler");
module.exports.deleteUser = async (req, res)=>{
    /*await roleGuard(["کاربران"],req,res)
    if(res.statusCode>399)
        return errorResponse(res,6)*/

    //کاربران
    const archiveIds = await checkAccessForAllUsersArchive(["61e3caf7d6d14316ac387bb7"],req.user.userId)

    if(archiveIds.length===0)
        return errorResponse(res,6)


    let deleteUser = await UserModel.findByIdAndUpdate(req.params.id,{
        $set:{
            isActive:false
        }
    })
    if(!deleteUser) return errorResponse(res,3)

    await insertLog(req,`کاربر ${deleteUser.userName} حذف شد`,`کاربر از سامانه حذف شد`,true,"کاربر")

    return res.send(true)
}

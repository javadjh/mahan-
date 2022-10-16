const AppSettingModel = require("../../../model/AppSettingModel");
const {roleGuard} = require("../../../authUtilities/Auth");
const {errorResponse} = require("../../../utility/ResponseHandler");
const {checkAccessForAllUsersArchive} = require("../../user/query/checkAccessForAllUsersArchive");
const {insertLog} = require("../../log/command/InsertLogCommand");

/*
دریافت اطلاعت پایه سامانه با ساتفاده از این ماژول صورت میگیرد
*/
module.exports.getAppSetting = async (req,res)=>{

    /*await roleGuard(["مدیریت اطلاعات پایه"],req,res)
    if(res.statusCode>399)
        return errorResponse(res,6)*/

    //[مدیریت اطلاعات پایه]
    const archiveIds = await checkAccessForAllUsersArchive(["623b60aa38d6870b90d8627e"],req.user.userId)

    if(archiveIds.length===0)
        return errorResponse(res,6)


    const appSetting = await AppSettingModel.findOne()


    return res.send(appSetting)
}

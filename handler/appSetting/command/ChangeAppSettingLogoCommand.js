const AppSettingModel = require("../../../model/AppSettingModel");
const {checkAccessForAllUsersArchive} = require("../../user/query/checkAccessForAllUsersArchive");
const {errorResponse} = require("../../../utility/ResponseHandler");
module.exports.changeAppSettingLogo = async (req,res)=>{

    //["مدیریت اطلاعات پایه"]
    const archiveIds = await checkAccessForAllUsersArchive(["623b60aa38d6870b90d8627e"],req.user.userId)

    if(archiveIds.length===0)
        return errorResponse(res,6)

    let {filename} = req.file

    const appSetting = await AppSettingModel.findOneAndUpdate({},{
        logo:filename
    },{new:true})

    return res.send({
        version:appSetting.version,
        logo:appSetting.logo
    })
}
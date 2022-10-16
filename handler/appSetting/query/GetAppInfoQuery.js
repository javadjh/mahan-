const AppSettingModel = require("../../../model/AppSettingModel");
module.exports.getAppInfo = async (req,res)=>{

    const appSetting = await AppSettingModel.findOne().select("version logo")

    return res.send({
        version:appSetting.version,
        logo:appSetting.logo
    })
}
const AppSettingModel = require("../../../model/AppSettingModel");
module.exports.isProjectInit = async (req,res)=>{
    const access = await AppSettingModel.findOne()
    console.log(access)
    return res.send(access?true:false)
}
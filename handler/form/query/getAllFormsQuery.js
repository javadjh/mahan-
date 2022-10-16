const FormModel = require("../../../model/FormModel");
const {checkAccessForAllUsersArchive} = require("../../user/query/checkAccessForAllUsersArchive");
const {insertLog} = require("../../log/command/InsertLogCommand");
const {convertToShamsi} = require("../../../utility/dateUtility");
const {roleGuard} = require("../../../authUtilities/Auth");
const {errorResponse} = require("../../../utility/ResponseHandler");

module.exports.getAllForms = async (req,res)=>{
    // roleGuard(["افزودن فرم"],req,res)

    //['افزودن فرم']
    const archiveIds = await checkAccessForAllUsersArchive(["61e3caf7d6d14316ac387bc4","61e3caf7d6d14316ac387bc5","61f65725a31fc706a0c94931"],req.user.userId)

    if(archiveIds.length===0)
        return errorResponse(res,6)

    const forms = await FormModel.find({
        isActive:true
    }).populate("creator").lean()
    forms.map(f=>{
        f.createDate = convertToShamsi(f.createDate)
    })

    await insertLog(req,"لیست فرم ها",`لیست فرم ها برای این کاربر ارسال شد`,true,"فرم")
    return res.send(forms)
}

//برای ویرایش فرم ایجاد شده استفاده می شود id در params گرفته می شود بقیه اطلاعات از body همهچیز هم قابل ویرایش هست☺
const FormModel = require("../../../model/FormModel");
const {checkAccessForAllUsersArchive} = require("../../user/query/checkAccessForAllUsersArchive");
const {insertLog} = require("../../log/command/InsertLogCommand");
const {errorResponse} = require("../../../utility/ResponseHandler");
const {insertFormValidator} = require("../../../validator/FormValidator");
const {roleGuard} = require("../../../authUtilities/Auth");
module.exports.updateForm = async (req,res)=>{
    // roleGuard(['افزودن فرم'],req,res)

    //['افزودن فرم']
    const archiveIds = await checkAccessForAllUsersArchive(["61e3caf7d6d14316ac387bc4"],req.user.userId)

    if(archiveIds.length===0)
        return errorResponse(res,6)

    const {error} = insertFormValidator(req.body)
    if(error) {
        await insertLog(req,"ویرایش فرم",`خطا در ویرایش فرم رخ داد - دلیل آن اشتباه بودن ورودی ها میباشد`,false,"فرم")
        return  errorResponse(res,error.message)
    }

    const formUpdated = await FormModel.findByIdAndUpdate(req.params.id,{$set:req.body})

    if(!formUpdated) {
        await insertLog(req,"ویرایش فرم",`خطا در ویرایش فرم رخ داد`,false,"فرم")
        return errorResponse(res,4)
    }

    await insertLog(req,"ویرایش فرم",`یک فرم در سامانه ثبت شد`,true,"فرم")
    return res.send(formUpdated)

}

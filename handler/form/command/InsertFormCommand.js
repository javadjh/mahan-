const FormModel = require("../../../model/FormModel");
const {checkAccessForAllUsersArchive} = require("../../user/query/checkAccessForAllUsersArchive");
const {insertLog} = require("../../log/command/InsertLogCommand");
const {errorResponse} = require("../../../utility/ResponseHandler");
const {insertFormValidator} = require("../../../validator/FormValidator");
const {roleGuard} = require("../../../authUtilities/Auth");
/*
افزودن فرم به سامانه با استفاده از این ماژول صورت میپذیرد
 */
module.exports.insertForm = async (req,res)=>{
    // roleGuard(['افزودن فرم'],req,res)

    //['افزودن فرم']
    const archiveIds = await checkAccessForAllUsersArchive(["61e3caf7d6d14316ac387bc4"],req.user.userId)

    if(archiveIds.length===0)
        return errorResponse(res,6)

    const {error} = insertFormValidator(req.body)
    if(error) {
        await insertLog(req,"افزودن فرم",`خطا در افزودن فرم رخ داد`,false,"فرم")
        return  errorResponse(res,error.message)
    }

    const {title,description,children} = req.body

    const newForm = await new FormModel({
        title,description,children,
        creator:req.user.userId,
    })

    if(!newForm) {
        await insertLog(req,"افزودن فرم",`خطا در افزودن فرم رخ داد`,false,"فرم")
        return errorResponse(res,1)
    }

    await newForm.save()
    await insertLog(req,"افزودن فرم",`یک فرم جدید در سامانه ثبت شد`,true,"فرم")
    return res.send(newForm)

}

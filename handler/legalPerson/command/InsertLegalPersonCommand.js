const LegalPersonModel = require("../../../model/LegalPerson");
const {checkAccessForAllUsersArchive} = require("../../user/query/checkAccessForAllUsersArchive");
const {insertLog} = require("../../log/command/InsertLogCommand");
const {errorResponse} = require("../../../utility/ResponseHandler");
const {insertLegalPersonValidator} = require("../../../validator/LegalPersonValidator");
const {roleGuard} = require("../../../authUtilities/Auth");
/*
جهت ثبت شخص حقوقی استفاده می شود
 */
module.exports.insertLegalPerson = async (req,res)=>{
    // roleGuard(['مدیریت اشخاص حقوقی'],req,res)

    //['مدیریت اشخاص حقوقی']
    const archiveIds = await checkAccessForAllUsersArchive(["61ea8a920ac4be3e0c304dac"],req.user.userId)

    if(archiveIds.length===0)
        return errorResponse(res,6)

    const {error} = insertLegalPersonValidator(req.body)
    console.log(error)
    if(error) {
        await insertLog(req,"افزودن شخص حقوقی",`خطا در افزودن شخص حقوقی رخ داد-دلیل آن اشتباه در ارسال اطلاعات میباشد`,false,"شخص حقوقی")
        return errorResponse(res,error.message)
    }

    let newLegalPerson = await new LegalPersonModel({...req.body, ...{creator:req.user.userId}})

    if(!newLegalPerson) return errorResponse(res,1)

    newLegalPerson = await newLegalPerson.save()

    await insertLog(req,"افزودن شخص حقوقی",`افزودن شخص حقوقی با موفقیت انجام شد`,true,"شخص حقوقی")

    return res.send(newLegalPerson)
}

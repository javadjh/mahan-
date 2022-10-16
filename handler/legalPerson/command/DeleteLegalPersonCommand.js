/*
جهت تغییر حالت شخص حقیقی از active به deActivate
 */
const LegalPersonModel = require("../../../model/LegalPerson");
const {checkAccessForAllUsersArchive} = require("../../user/query/checkAccessForAllUsersArchive");
const {insertLog} = require("../../log/command/InsertLogCommand");
const {errorResponse} = require("../../../utility/ResponseHandler");
const {roleGuard} = require("../../../authUtilities/Auth");
const {isValidObjectId} = require('mongoose')
module.exports.deleteLegalPerson = async (req, res)=>{
    // roleGuard(['مدیریت اشخاص حقوقی'],req,res)

    //['مدیریت اشخاص حقوقی']
    const archiveIds = await checkAccessForAllUsersArchive(["61ea8a920ac4be3e0c304dac"],req.user.userId)

    if(archiveIds.length===0)
        return errorResponse(res,6)

    if(!isValidObjectId(req.params.id)) {
        await insertLog(req,"حذف شخص حقوقی",`خطا در حذف شخص حقوقی رخ داد - دلیل آن ارسال شناسه اشتباه میباشد`,false,"شخص حقوقی")
        return errorResponse(res,5)
    }

    let deleteLegalPerson = await LegalPersonModel.findByIdAndUpdate(req.params.id,{
        $set:{
            isActive:false
        }
    })

    if(!deleteLegalPerson) return errorResponse(res,3)
    await insertLog(req,"حذف شخص حقوقی",`حذف شخص حقوقی با موفقیت انجام شد`,true,"شخص حقوقی")
    res.send(true)
}

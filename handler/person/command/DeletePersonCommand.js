//تغییر وضعیت person از حالت active به deActivate
const PersonModel = require("../../../model/PersonModel");
const {checkAccessForAllUsersArchive} = require("../../user/query/checkAccessForAllUsersArchive");
const {insertLog} = require("../../log/command/InsertLogCommand");
const {errorResponse} = require("../../../utility/ResponseHandler");
const {roleGuard} = require("../../../authUtilities/Auth");
const {isValidObjectId} = require('mongoose')
//تغییر وضعیت اشخاص حقیقی Active به deActivate
module.exports.deletePerson = async (req, res)=>{
    //roleGuard(['مدیریت اشخاص حقیقی'],req,res)

    //[مدیریت اشخاص حقیقی]
    const archiveIds = await checkAccessForAllUsersArchive(["61ea8a920ac4be3e0c304dab"],req.user.userId)

    if(archiveIds.length===0)
        return errorResponse(res,6)

    if(!isValidObjectId(req.params.id)) {
        await insertLog(req,"حذف شخص حقیقی",`خطا در حذف فرم رخ داد - دلیل آن ارسال شناسه اشتباه میباشد`,false,"شخص حقوقی")
        return errorResponse(res,5)
    }

    const person = await PersonModel.findByIdAndUpdate(req.params.id,{
        $set:{
            isActive:false
        }
    },{new:true})

    if(!person) {
        await insertLog(req,"حذف شخص حقیقی",`خطا در حذف شخص حقیقی رخ داد`,false,"شخص حقیقی")
        return errorResponse(res,3)
    }
    await insertLog(req,"حذف شخص حقیقی",`حذف شخص حقیقی با موفقیت انجام شد`,true,"شخص حقیقی")
    return res.send(true)
}

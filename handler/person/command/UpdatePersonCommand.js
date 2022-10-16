const PersonModel = require("../../../model/PersonModel");
const {checkAccessForAllUsersArchive} = require("../../user/query/checkAccessForAllUsersArchive");
const {insertLog} = require("../../log/command/InsertLogCommand");
const {errorResponse} = require("../../../utility/ResponseHandler");
const {insertPersonValidator} = require("../../../validator/PersonValidator");
const {roleGuard} = require("../../../authUtilities/Auth");
const {isValidObjectId} = require('mongoose')
module.exports.updatePerson = async (req,res)=>{
    //roleGuard(['مدیریت اشخاص حقیقی'],req,res)

    //[مدیریت اشخاص حقیقی]
    const archiveIds = await checkAccessForAllUsersArchive(["61ea8a920ac4be3e0c304dab"],req.user.userId)

    if(archiveIds.length===0)
        return errorResponse(res,6)

    const {error} = insertPersonValidator(req.body)
    if(error) {
        await insertLog(req,"ویرایش شخص حقیقی",`خطا در ویرایش شخص حقیقی رخ داد-خطا در ارسال داده ها`,false,"شخص حقیقی")
        return errorResponse(res,error.message)
    }

    if(!isValidObjectId(req.params.id)) {
        await insertLog(req,"ویرایش شخص حقیقی",`خطا در ویرایش شخص حقیقی رخ داد-شناسه ارسال شده اشتباه میباشد`,false,"شخص حقیقی")
        return errorResponse(res,5)
    }

    const person = await PersonModel.findByIdAndUpdate(req.params.id,{$set:req.body})

    if(!person) {
        await insertLog(req,"ویرایش شخص حقیقی",`خطا در ویرایش شخص حقیقی رخ داد`,false,"شخص حقیقی")
        return errorResponse(res,4)
    }

    await insertLog(req,"ویرایش شخص حقیقی",`شخص حقیقی ${person.firstName} ${person.lastName} با موفقیت ویرایش شد`,true,"شخص حقیقی")

    return res.send(person)
}

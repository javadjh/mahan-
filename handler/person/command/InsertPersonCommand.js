const PersonModel = require("../../../model/PersonModel");
const {checkAccessForAllUsersArchive} = require("../../user/query/checkAccessForAllUsersArchive");
const {insertLog} = require("../../log/command/InsertLogCommand");
const {roleGuard} = require("../../../authUtilities/Auth");
const {errorResponse} = require("../../../utility/ResponseHandler");
const {insertPersonValidator} = require("../../../validator/PersonValidator");
//برای افزودن شخص حقیقی استفاده می شود و تمامیه فیلد ها اجباری میباشد
module.exports.insertPerson = async (req,res)=>{
    //roleGuard(['مدیریت اشخاص حقیقی'],req,res)

    //[مدیریت اشخاص حقیقی]
    const archiveIds = await checkAccessForAllUsersArchive(["61ea8a920ac4be3e0c304dab"],req.user.userId)

    if(archiveIds.length===0)
        return errorResponse(res,6)

    const {error} = insertPersonValidator(req.body)
    if(error) {
        await insertLog(req,"افزودن شخص حقیقی",`خطا در افزودن شخص حقیقی رخ داد - دلیل آن خطا در ارسال داده ها میباشد`,false,"شخص حقیقی")
        return  errorResponse(res,error.message)
    }


    let newPerson = await new PersonModel({...req.body, ...{creator:req.user.userId}})

    if(!newPerson) return errorResponse(res,1)

    newPerson = await newPerson.save()

    await insertLog(req,"افزودن شخص حقیقی",`شخص حقیقی ${newPerson.firstName} ${newPerson.lastName} با موفقیت اضافه شد`,true,"شخص حقیقی")

    return res.send(newPerson)

}

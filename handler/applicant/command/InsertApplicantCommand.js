
const ApplicantModel = require("../../../model/ApplicantModel");
const {insertApplicantValidator} = require("../../../validator/ApplicantValidator");
const {checkAccessForAllUsersArchive} = require("../../user/query/checkAccessForAllUsersArchive");
const {errorResponse} = require("../../../utility/ResponseHandler");
const {insertLog} = require("../../log/command/InsertLogCommand");
/*
در این قسمت میتوانید به سمت سازمانی آیتم اضافه کرد
*/

module.exports.insertApplicant = async (req,res)=>{
    /*await roleGuard(['مدیریت سمت سازمانی'],req,res)
    if(res.statusCode>399)
        return errorResponse(res,6)*/

    //['مدیریت سمت سازمانی']
    const archiveIds = await checkAccessForAllUsersArchive(["6227b4d2b2bb4c36207bab7a"],req.user.userId)

    if(archiveIds.length===0){
        await insertLog(req,"خطا در ثبت سمت سازمانی",`کاربر به دلیل عدم مجوز در بخش سمت سازمانی موفق به ثبت چارت جدید نشد`,false,"چارت سمت سازمانی")
        return errorResponse(res,6)
    }

    const {error} = insertApplicantValidator(req.body)
    if(error) return errorResponse(res,error.message)

    let newApplicant = await new ApplicantModel(req.body)
    if(!newApplicant) return errorResponse(res,1)

    newApplicant = await newApplicant.save()
    await insertLog(req,"ثبت سمت سازمانی",`کاربر چارتی با عنوان ${req.body.title} ثبت کرد`,true,"سمت سازمانی")
    return res.send(newApplicant)
}

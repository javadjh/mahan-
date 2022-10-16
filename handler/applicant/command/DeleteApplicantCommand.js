const ApplicantModel = require("../../../model/ApplicantModel");

const {checkAccessForAllUsersArchive} = require("../../user/query/checkAccessForAllUsersArchive");
const {roleGuard} = require("../../../authUtilities/Auth");
const {isValidObjectId} = require('mongoose')
const {errorResponse} = require("../../../utility/ResponseHandler");
const {insertLog} = require("../../log/command/InsertLogCommand");

/*
حذف مورد از سمت سازمانی
*/
module.exports.deleteApplicant = async (req,res)=>{
    /*await roleGuard(['مدیریت سمت سازمانی'],req,res)
    if(res.statusCode>399)
        return errorResponse(res,6)*/

    //['مدیریت سمت سازمانی']
    const archiveIds = await checkAccessForAllUsersArchive(["6227b4d2b2bb4c36207bab7a"],req.user.userId)

    if(archiveIds.length===0)
        return errorResponse(res,6)

    if(!isValidObjectId(req.params.id)) {
        await insertLog(req,"حذف سمت سازمانی",`کاربر شناسانه اشتباه ارسال کرد - کاربر از سامانه به درستی استفاده نمیکند`,false,"سمت سازمانی")
        return errorResponse(res,5)
    }

    const applicant = await ApplicantModel.findByIdAndRemove(req.params.id)

    await insertLog(req,"حذف سمت سازمانی",`کاربر چارت ${applicant.title} را حذف کرد`,true,"سمت سازمانی")

    return res.send(true)
}


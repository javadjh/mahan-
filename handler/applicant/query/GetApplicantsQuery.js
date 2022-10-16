const ApplicantModel = require("../../../model/ApplicantModel");

const {errorResponse} = require("../../../utility/ResponseHandler");
const {roleGuard} = require("../../../authUtilities/Auth");
const {checkAccessForAllUsersArchive} = require("../../user/query/checkAccessForAllUsersArchive");
const {insertLog} = require("../../log/command/InsertLogCommand");

/*
دریافت سمت سازمانی به صورت یکجا
*/
module.exports.getApplicants = async (req,res)=>{
    /*await roleGuard(['مدیریت سمت سازمانی'],req,res)
    if(res.statusCode>399)
        return errorResponse(res,6)*/

    //['مدیریت سمت سازمانی']
    const archiveIds = await checkAccessForAllUsersArchive(["6227b4d2b2bb4c36207bab7a"],req.user.userId)

    if(archiveIds.length===0)
        return errorResponse(res,6)

    const applicants = await ApplicantModel.find().sort({createDate:-1})

    await insertLog(req,"دریافت سمت سازمانی",`کاربر لیست چارت سازمان را دریافت کرد`,true,"سمت سازمانی")

    return res.send(applicants)
}

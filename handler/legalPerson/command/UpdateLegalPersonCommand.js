/*
جهت ویرایش شخص حقوقی استفاده میشه
 */
const LegalPersonModel = require("../../../model/LegalPerson");
const {checkAccessForAllUsersArchive} = require("../../user/query/checkAccessForAllUsersArchive");
const {insertLog} = require("../../log/command/InsertLogCommand");
const {errorResponse} = require("../../../utility/ResponseHandler");
const {insertLegalPersonValidator} = require("../../../validator/LegalPersonValidator");
const {roleGuard} = require("../../../authUtilities/Auth");
const {isValidObjectId} = require('mongoose')
module.exports.updateLegalPerson = async (req, res)=>{
    // roleGuard(['مدیریت اشخاص حقوقی'],req,res)

    //['مدیریت اشخاص حقوقی']
    const archiveIds = await checkAccessForAllUsersArchive(["61ea8a920ac4be3e0c304dac"],req.user.userId)

    if(archiveIds.length===0)
        return errorResponse(res,6)

    //این ولیدیشن با insert برابر هست
    const {error} = insertLegalPersonValidator(req.body)
    if(error) return  errorResponse(res,error.message)

    if(!isValidObjectId(req.params.id)) return errorResponse(res,5)

    let updateLegalPerson = await LegalPersonModel.findByIdAndUpdate(req.params.id,{
        $set:req.body
    })

    if(!updateLegalPerson) return errorResponse(res,4)

    await insertLog(req,"ویرایش شخص حقوقی",`شخص حقوقی ${updateLegalPerson.companyName} ویرایش شد`,true,"شخص حقوقی")
    return res.send(updateLegalPerson)
}

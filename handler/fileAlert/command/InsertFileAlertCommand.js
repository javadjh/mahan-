const FileAlertModel = require("../../../model/FileAlertModel");
const {checkUserArchiveAccess} = require("../../user/query/CheckUserArchiveAccess");
const {insertFileAlertValidator} = require("../../../validator/FileAlertValidator");
const {errorResponse} = require("../../../utility/ResponseHandler");
const {roleGuard} = require("../../../authUtilities/Auth");
/*
ثبت هشدار برای پرونده
*/
module.exports.insertFileAlert = async (req,res)=>{
    const {archiveId} = req.body

    const {error} = insertFileAlertValidator(req.body)
    if(error) errorResponse(res,error.message)

    await roleGuard(["ویرایش پرونده"],req,res)
    if(res.statusCode>399)
        return errorResponse(res,6)

    const isFind = checkUserArchiveAccess(req.user.userId,archiveId)
    if(!isFind) errorResponse(res,"به این بایگانی دسترسی ندارید")

    let newFileAlert = await new FileAlertModel({...req.body, ...{creator:req.user.userId}})

    if(!newFileAlert) return errorResponse(res,1)
    newFileAlert = await newFileAlert.save()

    return res.send(newFileAlert)
}

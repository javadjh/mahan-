const FileModel = require("../../../model/FileModel");
const DocumentModel = require("../../../model/DocumentModel");
const FileAlertModel = require("../../../model/FileAlertModel");
const {checkUserArchiveAccess} = require("../../user/query/CheckUserArchiveAccess");
const {isValidObjectId} = require('mongoose')
const {errorResponse} = require("../../../utility/ResponseHandler");
const {roleGuard} = require("../../../authUtilities/Auth");


/*
برای غیر فعال کردن یک پرونده با کار میرود
فقط نیاز به ای دی داره
*/
module.exports.deleteFile = async (req,res)=>{
    await roleGuard(["حذف پرونده"],req,res)
    if(res.statusCode>399)
        return errorResponse(res,6)
    const {id} = req.params
    if(!isValidObjectId(id)) return errorResponse(res,5)


    const documents = await DocumentModel.find({
        fileId:id,
        isActive:true
    }).count()

    if(documents>0){
        return errorResponse(res,`این پرونده شامل ${documents} سند فعال میباشد`)
    }

    const updatedFile = await FileModel.findById(id)

    const isFind = checkUserArchiveAccess(req.user.userId,updatedFile.archiveId)
    if(!isFind) return errorResponse(res,"شما به این بایگانی دسترسی ندارید")

    if(!updatedFile) return errorResponse(res,3)
    updatedFile.isActive = false

    await updatedFile.save()

    await FileAlertModel.updateMany({fileId:updatedFile._id,},{$set:{isActive:false}})

    return res.send(true)
}

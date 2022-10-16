const DocumentModel = require("../../../model/DocumentModel");
const {roleGuard} = require("../../../authUtilities/Auth");
const {isValidObjectId} = require('mongoose')
const {errorResponse} = require("../../../utility/ResponseHandler");
const {insertLog} = require("../../log/command/InsertLogCommand");

module.exports.changeDocumentsName = async (req,res)=>{
    await roleGuard(["ویرایش سند"],req,res)
    if(res.statusCode>399)
        return errorResponse(res,6)
    const {id} = req.params
    const {title} = req.body

    if(!isValidObjectId(id)) return errorResponse(res,5)

    const document = await DocumentModel.findByIdAndUpdate(id,{$set:{title}})

    if(!document) errorResponse(res,4)

    await insertLog(req,"تغییر نام سند",`کاربر نام سند را از ${document.title} به ${title} تغییر داد`,true,"سند",document.fileId)


    return res.send(document)

}

const DocumentModel = require("../../../model/DocumentModel");
const UserModel = require("../../../model/UserModel");
const {convertToShamsi} = require("../../../utility/dateUtility");
const {isValidObjectId} = require('mongoose')
const {errorResponse} = require("../../../utility/ResponseHandler");
const {roleGuard} = require("../../../authUtilities/Auth");
const {insertLog} = require("../../log/command/InsertLogCommand");


module.exports.addNewNoteForDocument = async (req,res)=>{
    await roleGuard(["ویرایش سند"],req,res)
    if(res.statusCode>399)
        return errorResponse(res,6)

    const {documentId,description} = req.body
    if(!isValidObjectId(documentId) || description.length<2) return errorResponse()

    let document = await DocumentModel.findById(documentId)
    const user = await UserModel.findById(req.user.userId)
    document.notes.push({
        description,
        creator:req.user.userId,
        userFullName:user.firstName + " " + user.lastName,
        userName:user.userName
    })
    document = await document.save()

    document.notes.map(n=>{
        n.createDate = convertToShamsi(n.createDate)
    })

    await insertLog(req,"افزودن یادداشت",`کاربر یک یادداشت به سندی با عنوان ${document.title} اضافه کرد`,true,"سند",document.fileId)

    return res.send(document)

}

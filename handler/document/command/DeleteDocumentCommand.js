const DocumentModel = require("../../../model/DocumentModel");
const UserModel = require("../../../model/UserModel");
const {roleGuard} = require("../../../authUtilities/Auth");
const glob = require("glob")
const fs = require("fs")
const {errorResponse} = require("../../../utility/ResponseHandler");

const {isValidObjectId} = require('mongoose')

module.exports.deleteDocument = async (req,res)=>{
    await roleGuard(["حذف سند"],req,res)
    if(res.statusCode>399)
        return errorResponse(res,6)
    const {documentId} = req.params
    //چک کردن اطلاعات ورودی
    if(!isValidObjectId(documentId)) return errorResponse(res,5)

    const document = await DocumentModel.findById(documentId)
    const user = await UserModel.findById(req.user.userId).lean()
    let isFind = false
    user.role.map(r=>{
        if(r.archiveId.toString()===document.archiveId.toString()){
            isFind = true
        }
    })
    if(!isFind) return errorResponse(res,"شما به این بایگانی و پرونده دسترسی ندارید")

    document.isActive = false
    await document.save()

    res.send(true)

}

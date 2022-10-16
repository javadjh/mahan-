const DocumentModel = require("../../../model/DocumentModel");
const UserModel = require("../../../model/UserModel");
const {checkUserArchiveAccess} = require("../../user/query/CheckUserArchiveAccess");
const {isValidObjectId} = require('mongoose')
const {errorResponse} = require("../../../utility/ResponseHandler");
const {roleGuard} = require("../../../authUtilities/Auth");
/*
برای بازگردانی سند میباشد
*/
module.exports.restoreDocument = async (req,res)=>{
    await roleGuard(['مدیریت اسناد حذف شده'],req,res)
    if(res.statusCode>399)
        return errorResponse(res,6)
    const {id} = req.params

    if(!isValidObjectId(id)) return errorResponse(res,5)

    const document = await DocumentModel.findById(id)

    const isFind = checkUserArchiveAccess(req.user.userId,document.archiveId)
    if(!isFind) return errorResponse(res,"شما به این بایگانی و پرونده دسترسی ندارید")

    document.isActive = true
    await document.save()

    res.send(true)

}

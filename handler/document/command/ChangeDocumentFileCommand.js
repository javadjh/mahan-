const UserModel = require("../../../model/UserModel");
const DocumentModel = require("../../../model/DocumentModel");
const {checkUserArchiveAccess} = require("../../user/query/CheckUserArchiveAccess");
const {roleGuard} = require("../../../authUtilities/Auth");
const {errorResponse} = require("../../../utility/ResponseHandler");
const {insertLog} = require("../../log/command/InsertLogCommand");

/*
تغییر پرونده گروهی از اسناد
 */
module.exports.changeDocumentFile = async (req,res)=>{
    const {destination,documents} = req.body

    await roleGuard(['ویرایش سند'],req,res)
    if(res.statusCode>399)
        return errorResponse(res,6)

    const isFind = checkUserArchiveAccess(req.user.userId)
    if(!isFind) {
        return errorResponse(res,"شما به این بایگانی دسترسی ندارید")
    }

    let archive = documents.documents[0].archiveId
    let file = documents.documents[0].fileId




    let isDif = false
    documents.documents.map(d=>{
        if(d.archiveId!==archive || d.fileId!==file)
            isDif = true
    })
    if(isDif) return errorResponse(res,"تمامیه اسناد باید از یک بایگانی و یک پرونده باشد")

    let documentIds = []
    documents.documents.map(d=>{
        documentIds.push(d._id)
    })

    const documentsUpdated = await DocumentModel.updateMany({
        _id:{
            $in:documentIds
        }
    },{
        $set:{
            fileId:destination.fileId,
            archiveId:destination.archiveId
        }
    })
    if(!documentsUpdated) return errorResponse(res,4)
    await insertLog(req,"تغییر پرونده اسناد",`کاربر بک سری اسناد را از پرونده ${documents.documents[0].title} را به پرونده ${documentsUpdated.title} تغییر داد`,true,"سند",documents.documents[0].fileId)

    res.send(true)

}

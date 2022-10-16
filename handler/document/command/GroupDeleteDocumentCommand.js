const DocumentModel = require("../../../model/DocumentModel");
const {checkUserArchiveAccess} = require("../../user/query/CheckUserArchiveAccess");
const {roleGuard} = require("../../../authUtilities/Auth");
const {errorResponse} = require("../../../utility/ResponseHandler");

module.exports.groupDeleteDocument = async (req,res)=>{
    let {documents} = req.body
    console.log(documents)
    await roleGuard(['حذف سند'],req,res)
    if(res.statusCode>399)
        return errorResponse(res,6)

    const isFind = checkUserArchiveAccess(req.user.userId)
    if(!isFind) errorResponse(res,"شما به این بایگلنی دسترسی ندارید")

    let archive = documents[0].archiveId
    let file = documents[0].fileId
    let isDif = false
    documents.map(d=>{
        if(d.archiveId!==archive || d.fileId!==file)
            isDif = true
    })
    if(isDif) errorResponse(res,"تمامیه اسناد باید از یک بایگانی و یک پرونده باشد")

    let documentIds = []
    documents.map(d=>{
        documentIds.push(d._id)
    })

    await DocumentModel.updateMany({
        _id:{
            $in:documentIds
        }
    },{
        $set:{
            isActive:false
        }
    })

    return res.send(true)


}

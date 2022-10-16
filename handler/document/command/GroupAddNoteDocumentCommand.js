const DocumentModel = require("../../../model/DocumentModel");
const UserModel = require("../../../model/UserModel");
const {checkUserArchiveAccess} = require("../../user/query/CheckUserArchiveAccess");
const {roleGuard} = require("../../../authUtilities/Auth");
const {errorResponse} = require("../../../utility/ResponseHandler");

/*
برای افزودن گروهی یادداشت به اسناد این ماژول مورد استفاده قرار میگیرد
 */
module.exports.groupAddNoteDocument = async (req,res)=>{
    let {documents,description} = req.body
    await roleGuard(['ویرایش سند'],req,res)
    if(res.statusCode>399)
        return errorResponse(res,6)


    const user = await UserModel.findById(req.user.userId).lean()

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

    let documentsUpdated = await DocumentModel.updateMany({
        _id:{
            $in:documentIds
        }
    },{
        $push:{
            notes:{
                description,
                creator:req.user.userId,
                userFullName:user.firstName + " " + user.lastName,
                userName:user.userName
            }
        }
    })
    if(!documentsUpdated) errorResponse(res,4)

    res.send(true)
}

const FileModel = require("../../../model/FileModel");
const {checkUserArchiveAccess} = require("../../user/query/CheckUserArchiveAccess");
const {roleGuard} = require("../../../authUtilities/Auth");
const {errorResponse} = require("../../../utility/ResponseHandler");
const UserModel = require("../../../model/UserModel");

/*
تغییر قفسه یک پرونده با استفاده از این ماژول صورت میگیرد
fileId:
*/
module.exports.changeFilesArchiveTree = async (req,res)=>{
    await roleGuard(["ویرایش پرونده"],req,res)
    if(res.statusCode>399)
        return errorResponse(res,6)

    const {fileId,destinationArchiveTree} = req.body

    await roleGuard(["ویرایش پرونده"],req,res,destinationArchiveTree.archive)
    if(res.statusCode>399)
        return errorResponse(res,6)

    if(!fileId && !destinationArchiveTree.archive && !destinationArchiveTree._id){
        return errorResponse(res,"اطلاعات ارسال شده ناقص میباشد")
    }


    const fileUpdated = await FileModel.findById(fileId)

    if(!fileUpdated.isActive){
        return errorResponse(res,"این پرونده فعال نمیباشد")
    }

    fileUpdated.archiveTreeId = destinationArchiveTree._id
    await fileUpdated.save()

    return res.send(true)
}

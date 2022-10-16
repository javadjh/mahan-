const DocumentModel = require("../../../model/DocumentModel");
const LibraryShelfModel = require("../../../model/LibraryShelfModel");
const {removeDocumentFromLibraryShelf} = require("../../libraryShelf/command/RemoveDocumentFromLibraryShelfCommand");
const {isValidObjectId} = require('mongoose')
const {errorResponse} = require("../../../utility/ResponseHandler");

/*
حذف سند هایی که هنوز در کازیو هستند
*/
module.exports.deleteLibrariesFile = async (req,res)=>{
    const {id,libraryShelfId} = req.params
    console.log(libraryShelfId)
    if(!isValidObjectId(id) || id.length<8){
        return errorResponse(res,5)
    }

    const document = await DocumentModel.findById(id)

    if(!document.isActive)
        return errorResponse(res,"این سند فعال نمیباشد")

    if(document.creator.toString()!==req.user.userId.toString())
        return errorResponse(res,"شما سازنده این سند نمیباشید")

    if(document.fileId)
        return errorResponse(res,"این سند دارای پرونده میباشد")

    document.isActive = false

    if(libraryShelfId){
        if(isValidObjectId(libraryShelfId) && libraryShelfId.length>8){
            await removeDocumentFromLibraryShelf(libraryShelfId,id)
        }

    }

    await document.save()



    return res.send(true)
}

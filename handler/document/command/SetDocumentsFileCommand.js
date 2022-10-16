const DocumentModel = require("../../../model/DocumentModel");
const {removeMultiDocumentsFromLibraryShelf} = require("../../libraryShelf/command/RemoveDocumentFromLibraryShelfCommand");
const {isValidObjectId} = require('mongoose')
const {removeDocumentFromLibraryShelf} = require("../../libraryShelf/command/RemoveDocumentFromLibraryShelfCommand");
const {errorResponse} = require("../../../utility/ResponseHandler");
const {roleGuard} = require("../../../authUtilities/Auth");
module.exports.setDocumentsFile = async (req,res)=>{
    await roleGuard(["ایجاد سند"],req,res)
    if(res.statusCode>399)
        return errorResponse(res,6)
    const {documents,archiveId,file,libraryShelfId} = req.body
    const documentUpdated = await DocumentModel.updateMany({
        _id:documents
    },{
        $set:{
            archiveId,
            fileId:file
        }
    })
    if(!documentUpdated) return errorResponse(res,4)

    if(libraryShelfId){
        if(isValidObjectId(libraryShelfId) && libraryShelfId.length>8){
            await removeMultiDocumentsFromLibraryShelf(libraryShelfId,documents)
        }
    }

    return res.send(documentUpdated)
}

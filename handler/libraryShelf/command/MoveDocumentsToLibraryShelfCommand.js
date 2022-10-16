const DocumentModel = require("../../../model/DocumentModel");
const LibraryShelfModel = require("../../../model/LibraryShelfModel");
const {insertDocumentToLibraryShelf} = require("./InsertDocumentToLibraryShelfCommand");
module.exports.moveDocumentsToLibraryShelf = async (req,res)=>{

    const {documentsId,destinationShelfId} = req.body

    let documents = await DocumentModel.find({
        _id:{
            $in:documentsId
        },
        fileId:undefined,
        inShelve:false,
        creator:req.user.userId
    }).lean()


    for (let i = 0; i < documents.length; i++) {
        await DocumentModel.findByIdAndUpdate(documents[i]._id,{
            $set:{
                inShelve:true
            }
        })
        await insertDocumentToLibraryShelf(destinationShelfId,documents[i]._id)
    }

    return res.send(true)
}
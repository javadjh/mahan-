/*
با استفاده از این ماژول شما میتوانید لیستی از اسناد را حذف کنید
*/
const DocumentModel = require("../../../model/DocumentModel");
const {removeMultiDocumentsFromLibraryShelf} = require("../../libraryShelf/command/RemoveDocumentFromLibraryShelfCommand");
const {isValidObjectId} = require('mongoose')

module.exports.deleteGroupLibrariesDocument = async (req,res)=>{
    const {documentIds,libraryShelfId} = req.body

    await DocumentModel.updateMany({
        _id:{
            $in:documentIds
        },
        isActive:true,
        creator:req.user.userId
    },{
        isActive:false
    })

    if(libraryShelfId){
        if(isValidObjectId(libraryShelfId) && libraryShelfId.length>8){
            await removeMultiDocumentsFromLibraryShelf(libraryShelfId,documentIds)
        }
    }

    return res.send(true)
}

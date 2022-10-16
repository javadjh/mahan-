const LibraryShelfModel = require("../../../model/LibraryShelfModel");
module.exports.removeDocumentFromLibraryShelf = async (libraryShelfId,id)=>{
    const libraryShelf = await LibraryShelfModel.findById(libraryShelfId)
    let documents = libraryShelf.documents

    documents = documents.filter(d=>d.toString()!==id.toString())
    libraryShelf.documents = documents

    console.log(documents)
    const shelf = await  LibraryShelfModel.findByIdAndUpdate(libraryShelfId,{
        $set:{
            documents
        }
    })
}

module.exports.removeMultiDocumentsFromLibraryShelf = async (libraryShelfId,documents)=>{
    const libraryShelf = await LibraryShelfModel.findById(libraryShelfId).lean()

    let newDocuments = []

    newDocuments = libraryShelf.documents.filter(x => !documents.includes(x.toString()));

    const updateLibraryShelf = await LibraryShelfModel.findOne({
        _id:libraryShelfId
    })

    updateLibraryShelf.documents = newDocuments
    await updateLibraryShelf.save()


}

const LibraryShelfModel = require("../../../model/LibraryShelfModel");
module.exports.insertDocumentToLibraryShelf = async (libraryShelfId,documentId)=>{
    const libraryShelf = await LibraryShelfModel.findById(libraryShelfId)

    let documents = libraryShelf.documents
    documents.push(documentId)
    libraryShelf.documents = documents

    await libraryShelf.save()
}

const LibraryShelfModel = require("../../../model/LibraryShelfModel");
const {isValidObjectId} = require('mongoose')
const {errorResponse} = require("../../../utility/ResponseHandler");

/*
اگر پوشه داخل کازیو خالی از سند بود قابلیت حذف دارد
*/
module.exports.deleteLibraryShelf = async (req,res)=>{
    const {id} = req.params

    if(!isValidObjectId(id) || id.length<8){
        return errorResponse(res,5)
    }

    const libraryShelf = await LibraryShelfModel.findById(id)

    if(libraryShelf.documents.length>0){
        return errorResponse(res,"این قفسه شامل سند میباشد")

    }

    await libraryShelf.remove()

    return res.send(true)
}

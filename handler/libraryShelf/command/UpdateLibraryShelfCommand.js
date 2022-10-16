const LibraryShelfModel = require("../../../model/LibraryShelfModel");
const {isValidObjectId} = require('mongoose')
const {errorResponse} = require("../../../utility/ResponseHandler");

/*
بروزرسانی قفسه ی کازیو
*/
module.exports.updateLibraryShelf = async (req,res)=>{
    const {id} = req.params
    const {title} = req.body

    if(!isValidObjectId(id) || id.length<8)
        return errorResponse(res,5)

    if(title.length<2)
        return errorResponse(res,"عنوان کوتاه میباشد")

    let libraryShelf = await LibraryShelfModel.findById(id)

    if(!libraryShelf.isActive)
        return errorResponse(res,"این قفسه فعال نمیباشد")


    if(libraryShelf.creator.toString()!==req.user.userId)
        return errorResponse(res,"شما مجوز تغییر در این قفسه را ندارید")

    libraryShelf.title = title

    libraryShelf = await libraryShelf.save()

    return res.send(libraryShelf)

}

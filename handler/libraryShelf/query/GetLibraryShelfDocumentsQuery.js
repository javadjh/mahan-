const LibraryShelfModel = require("../../../model/LibraryShelfModel");
const {convertToShamsi} = require("../../../utility/dateUtility");
const {isValidObjectId} = require('mongoose')
const {errorResponse} = require("../../../utility/ResponseHandler");

/*
دریافت اسناد یک پوشه کازیو(قابلیت ساخت پ.شه تو در تو را ندارد)
*/
module.exports.getLibraryShelfDocuments = async (req,res)=>{
    const {id} = req.params

    if(!isValidObjectId(id) || id.length<8){
        return errorResponse(res,5)
    }

    const libraryShelf = await LibraryShelfModel.findById(id).populate("documents").lean()


    if(libraryShelf.creator.toString() !== req.user.userId.toString()){
        return errorResponse(res,"شما سازنده این پوشه نیستید")
    }
    libraryShelf.documents.map(l=>{
        l.createDate = convertToShamsi(l.createDate)
    })

    return res.send(libraryShelf.documents)

}

const {errorResponse} = require("../../../utility/ResponseHandler");

/*
ثبت قفسه برای کاربر
*/
const LibraryShelfModel = require("../../../model/LibraryShelfModel");
module.exports.insertLibraryShelf = async (req,res)=>{
    const {title} = req.body

    if(title.length<2){
        return errorResponse(res,"عنوان ناقص میباشد")
    }

    await new LibraryShelfModel({
        title,
        creator:req.user.userId,
        documents:[]
    }).save()

    return res.send(true)


}

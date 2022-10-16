const DocumentModel = require("../../../model/DocumentModel");
const LibraryShelfModel = require("../../../model/LibraryShelfModel");
const {daysCalculate} = require("../../../utility/dateUtility");
const {convertToShamsi} = require("../../../utility/dateUtility");
const {roleGuard} = require("../../../authUtilities/Auth");
const {errorResponse} = require("../../../utility/ResponseHandler");

/*
دریافت اسناد بدون والد در این ماژول صورت میگیره
 */
module.exports.getLibrary = async (req, res)=>{

    const library = await DocumentModel.find({
        archiveId:undefined,
        fileId:undefined,
        creator:req.user.userId,
        isActive:true,
        inShelve:false
    }).lean()

    const libraryShelf = await LibraryShelfModel.find({creator:req.user.userId}).lean()
    libraryShelf.map(s=>{
        s.createDate = convertToShamsi(s.createDate)
    })

    for (let i = 0; i < library.length; i++) {
        console.log("library[i].createDate")
        console.log(Date(library[i].createDate))
        console.log(Date(new Date))
        let days = daysCalculate(new Date,library[i].createDate)
        console.log(days)
        if(days>30){
            await DocumentModel.findByIdAndUpdate(library[i]._id,{
                $set:{
                    isActive:false
                }
            })
        }else{
            library[i].lastModify = 30-days
        }
    }

    library.map(l=>{
        l.createDate = convertToShamsi(l.createDate)
    })

    return res.send({
        libraryShelf,
        library
    })

}

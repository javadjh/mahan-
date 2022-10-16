const FileModel = require("../../../model/FileModel");
const {convertToShamsi} = require("../../../utility/dateUtility");
const {roleGuard} = require("../../../authUtilities/Auth");
const {errorResponse} = require("../../../utility/ResponseHandler");
/*
دریافت پرونده های در انتظار تایید ناظر
*/
module.exports.getWaitingFiles = async (req,res)=>{
    await roleGuard(['ناظر'],req,res)
    if(res.statusCode>399)
        return errorResponse(res,6)

    const files = await FileModel.find({
        isActive:true,
        isConfirm:false,

    }).populate("archiveTreeId").lean()


    files.map(f=>{
        f.fileDate = convertToShamsi(f.fileDate)
        f.createDate = convertToShamsi(f.createDate)
    })

    res.send(files)
}

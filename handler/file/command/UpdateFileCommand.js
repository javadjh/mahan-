const ArchiveTreeModel = require("../../../model/ArchiveTree");
const FileModel = require("../../../model/FileModel");
const {errorResponse} = require("../../../utility/ResponseHandler");
const {generateFileCode} = require("../../../utility/generateFileCode");
const {insertLog} = require("../../log/command/InsertLogCommand");
const {roleGuard} = require("../../../authUtilities/Auth");
const moment = require('jalali-moment')
const {insertFileValidator} = require("../../../validator/FileValidator");
const {updateFileValidator} = require("../../../validator/FileValidator");

module.exports.updateFile = async (req,res)=>{
    await roleGuard(["ویرایش پرونده"],req,res)
    if(res.statusCode>399)
        return errorResponse(res,6)
    const {title,
        fileDate,
        fileStatus,
        keyword,
        type,
        contacts,
        applicantId} = req.body
    //با ثبت مشترک هست
    const {error} = insertFileValidator({
        title,
        fileDate,
        fileStatus,
        type,
        contacts,
        applicantId
    })
    if(error) {
        await insertLog(req,"ویرایش پرونده",`خطا در ویرایش پرونده جدید رخ داد - اطلاعات ارسال شده نادرست میباشد`,false,"پرونده")
        return errorResponse(res,error.message)
    }



    let updatedFile = await FileModel.findByIdAndUpdate(req.params.id,{
        $set:{
            title,
            fileDate,
            fileStatus,
            keyword,
            type,
            contacts,
            applicantId
        }
    })

    if(!updatedFile){
        await insertLog(req,"ویرایش پرونده",`خطا در ویرایش پرونده جدید رخ داد`,false,"پرونده")
        return errorResponse(res,1)
    }

    return res.send(updatedFile)
}

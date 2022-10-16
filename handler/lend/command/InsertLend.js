const LendModel = require("../../../model/LendModel");
const FileModel = require("../../../model/FileModel");
const {checkAccessForAllUsersArchive} = require("../../user/query/checkAccessForAllUsersArchive");
const {insertLendValidator} = require("../../../validator/LendValidator");
const {errorResponse} = require("../../../utility/ResponseHandler");
const {roleGuard} = require("../../../authUtilities/Auth");
/*
برای اشتراک گذاری سند های یک پرونده یا کل پرونده استفاده میشه
ای دی سند اجباری نیست چون میتونه کل پرونده رو به اشتراک بزاره - با بولین isCompleteFile مشخص میشه این داستان
 */
module.exports.insertLend = async (req,res)=>{
    await roleGuard(['اشتراک گذاری'],req,res)
    if(res.statusCode>399)
        return errorResponse(res,6)

    //['اشتراک گذاری']
    // const archiveIds = await checkAccessForAllUsersArchive(["621a0a4be8192f2084c06b01"],req.user.userId)

/*    if(archiveIds.length===0)
        return errorResponse(res,6)*/

    /*const {error} = insertLendValidator(req.body)
    if(error) return errorResponse(res,error.message)*/

    if(!req.body.isCompleteFile && req.body.documentIds.length<=0)
        return errorResponse(res,"شما نمیتوانید پرونده را به اشتراک بگذارید")

    const file = await FileModel.findById(req.body.fileId)
    if(!file.isConfirm){
        return errorResponse(res,"این پرنده در انتظار تایید ناظر میباشد ")
    }

    let newLend = await new LendModel({...req.body, ...{creator:req.user.userId}})

    if(!newLend) return errorResponse(res,1)

    newLend = await newLend.save()

     return res.send(newLend)

}

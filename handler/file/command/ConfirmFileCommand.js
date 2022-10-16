const FileModel = require("../../../model/FileModel");
const DocumentModel = require("../../../model/DocumentModel");
const {roleGuard} = require("../../../authUtilities/Auth");
const {errorResponse} = require("../../../utility/ResponseHandler");
const {isValidObjectId} = require('mongoose')
const ArchiveModel = require("../../../model/ArchiveModel");

/*
ناظر بایگانی میتونه پرونده را تایید کنه و تا قبل از تایید نمیتونه کار های زیر رو انجام بده:
-اشتراک گذاری
-ایمیل
-سرچ
**توی تایید همه اسناد هم همزمان تایید میشوند و از آن به بعد اسناد حالت تایید پرونده را میگیرند
همین
*/
module.exports.confirmFile = async (req,res)=>{
    await roleGuard(['ناظر'],req,res)
    if(res.statusCode>399)
        return errorResponse(res,6)

    //fileId
    const {id} = req.params

    if(!isValidObjectId(id) || id.length<8) return errorResponse(res,5)

    let file = await FileModel.findById(id)
    const archive = await ArchiveModel.findById(file.archiveId)

    if(file.isConfirm) return errorResponse(res,"این پرونده تایید شده است")
    if(!file.isActive) return errorResponse(res,"این پرونده غیر فعال است")

    if(file.waitingFor==="primitive"){
        console.log(req.user.userId)
        console.log(archive?.guardSystem?.primitive?.toString())
        if(archive?.guardSystem?.primitive?.toString()!==req.user.userId)
            return errorResponse(res,"شما به این عملیات دسترسی ندارید")
    }
    else if(file.waitingFor==="audit"){
        if(archive?.guardSystem?.audit?.toString()!==req.user.userId)
            return errorResponse(res,"شما به این عملیات دسترسی ندارید")
    }

    else if(file.waitingFor==="finally"){
        if(archive?.guardSystem?.finally?.toString()!==req.user.userId)
            return errorResponse(res,"شما به این عملیات دسترسی ندارید")
    }else {
        return errorResponse(res,"خطا رخ داد")
    }




    if(file.waitingFor==="finally"){
        file.isWaiting = false
        file.isReject = false
        file.isConfirm = true
        file.waitingFor = "finally"
    }else {
        switch (archive?.guardSystem?.cycle){
            case 2:
                file.waitingFor = "finally"
                break
            case 3:
                if(file.waitingFor==="primitive")
                    file.waitingFor = "audit"
                if(file.waitingFor==="audit")
                    file.waitingFor = "finally"
        }
    }

    file = await file.save()

    if(!file) return errorResponse(res,4)
    if(file.waitingFor==="finally" && file.isConfirm){
        let changeAllDocumentConfirmation = await DocumentModel.updateMany({
            fileId:id,
            isActive:true
        },{
            $set:{
                isFileConfirm:true
            }
        },{new:true})
        if(!changeAllDocumentConfirmation) return errorResponse(res,4)
    }



    return res.send(true)

}

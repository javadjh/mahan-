const FileModel = require("../../../model/FileModel");
const {roleGuard} = require("../../../authUtilities/Auth");
const {errorResponse} = require("../../../utility/ResponseHandler");
const {isValidObjectId } = require('mongoose')
/*
ارسال پرونده برای تایید ناظر بایگانی
isWaiting = true
اضافه کردن پیام جدید
*/
module.exports.sendFileToSupervisor = async (req,res)=>{
    await roleGuard(['ویرایش پرونده'],req,res)
    if(res.statusCode>399)
        return errorResponse(res,6)

    const {message} = req.body
    //fileId
    const {id} = req.params

    if(!isValidObjectId(id) || id.length<8) return errorResponse(res,5)
    if(message.length<3) return errorResponse(res,"پیام ارسال نشده")

    let file = await FileModel.findById(id)
    if(file.creator.toString()!==req.user.userId) return errorResponse(res,"شما ایجاد کننده نیستید")
    if(file.isConfirm) return errorResponse(res,"این پرونده تایید شده است")
    if(file.isWaiting) return errorResponse(res,"این پرونده در انتظار تغییرات ثبت کننده پرونده میباشد")
    if(!file.isActive) return errorResponse(res,"این پرونده غیر فعال است")

    file.isWaiting = true
    file.isReject = false
    file.isConfirm = false

    file.correspondence.push({
        message,
        isSupervisor:false,
        creator:req.user.userId,
    })

    file = await file.save()

    return res.send(file)
}

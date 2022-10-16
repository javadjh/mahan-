const DocumentModel = require("../../../model/DocumentModel");
const {isValidObjectId} = require('mongoose')
const {errorResponse} = require("../../../utility/ResponseHandler");
const encrypt = require('node-file-encrypt');
const path = require('path')
const fs = require('fs')

/*
ارسال اصل فایل جهت پیش نمایش در کازیو
*/
module.exports.getDocumentsFilePreviewLibrary = async (req,res)=>{
    const {id} = req.params

    if(!isValidObjectId(id) || id.length<8)
        return errorResponse(res,5)

    const document = await DocumentModel.findById(id)

    if(document.fileId)
        return errorResponse(res,"این سند شامل پرونده میباشد")
    if(document.creator.toString()!==req.user.userId)
        return errorResponse(res,"شما سازنده این سند نیستید")
    if(!document.isActive)
        return errorResponse(res,"این سند فعال نمیباشد")
    if(document.ex!=="png" && document.ex!=="jpg" && document.ex!=="jpge")
        return errorResponse(res,"این سند قابل نمایش نیست")

    let encryptPath = "uploads\\\\\\\\" + document.uniqueFileId
    console.log(path.join(__dirname + "../" + "../" + "../" + "../" + "/uploads/" + document._id + "." +  document.ex))

    let fr = new encrypt.FileEncrypt(encryptPath);
    fr.openSourceFile();
    try {
        await fr.decrypt(process.env.encryptKey,async ()=>{
            setTimeout(()=>{
                return res.sendFile(path.join(__dirname + "../" + "../" + "../" + "../" + "/uploads/" + document._id + "." +  document.ex))
            },1000)
        })
    }catch (err){
        setTimeout(()=>{
            return res.sendFile(path.join(__dirname + "../" + "../" + "../" + "../" + "/uploads/" + document._id + "." +  document.ex))
        },1000)

    }

}

const DocumentModel = require("../../../model/DocumentModel");
const {isValidObjectId} = require('mongoose')
const {errorResponse} = require("../../../utility/ResponseHandler");
const encrypt = require('node-file-encrypt');
const fs = require('fs')
const glob = require('glob')
const path = require('path')
/*
دریافت سند فاقد پرونده(کازیو) باید جک شود که سند ارسال شده شامل پرونده نباشد و سازنده خود کاربر باشد - اصل سند در اختیار کاربر قرار نمیگیرد و فقط pdf
*/
module.exports.getLibrariesFile = async (req,res)=>{
    const {id} = req.params

    if(!isValidObjectId(id) || id.length<8)
        return errorResponse(res,5)

    const document = await DocumentModel.findById(id)

    if(!document.isActive)
        return errorResponse(res,"این سند فعال نمیباشد")

    if(document.creator.toString()!==req.user.userId.toString())
        return errorResponse(res,"شما سازنده این سند نمیباشید")

    if(document.fileId)
        return errorResponse(res,"این سند دارای پرونده میباشد")


    await glob("uploads\\\\"+"*",{"ignore":["uploads\\\\"+'*.crypt']}, async function (err, files) {
        for (let i = 0; i < files.length; i++) {
            if(!isValidObjectId(files[i].substr(files[i].lastIndexOf("/")+1,files[i].length-1))){
                const stats = await fs.statSync(files[i])
                const today = new Date();
                const endDate = stats.ctime;
                const minutes = parseInt(Math.abs(endDate.getTime() - today.getTime()) / (1000 * 60) % 60);
                if(minutes>1)
                    await fs.unlinkSync(files[i])

                console.log(files[i].substr(files[i].indexOf("/")+1,files[i].length))
            }
        }

        let encryptPath = ''
        if(document.ex==="png"||document.ex==="jpg"||document.ex==="jpge"||document.ex==="docx"||document.ex==="xlsm" || document.ex==="xlsx"||document.ex==="txt"){
            encryptPath = "uploads\\\\\\\\" + document.uniquePdfFileId
        }else{
            encryptPath = "uploads\\\\\\\\" + document.uniqueFileId
        }

        let fr = new encrypt.FileEncrypt(encryptPath);
        fr.openSourceFile();
        await fr.decrypt(process.env.encryptKey,async ()=>{
            if(document.ex==="png"||document.ex==="jpg"||document.ex==="jpge"||document.ex==="docx"||document.ex==="xlsm" || document.ex==="xlsx"||document.ex==="txt"){
                await fs.readFile(path.join(__dirname + "../" + "../" + "../" + "../" + "/uploads/" + document._id + ".pdf"),()=>{
                    setTimeout(()=>{
                        return res.sendFile(path.join(__dirname + "../" + "../" + "../" + "../" + "/uploads/" + document._id + ".pdf"))
                    },1000)
                })

            }else{
                await fs.readFile(path.join(__dirname + "../" + "../" + "../" + "../" + "/uploads/" + document._id + "." +  document.ex),()=>{
                    setTimeout(()=>{
                        return res.sendFile(path.join(__dirname + "../" + "../" + "../" + "../" + "/uploads/" + document._id + "." +  document.ex))
                    },1000)
                })
            }
        })
    })



}

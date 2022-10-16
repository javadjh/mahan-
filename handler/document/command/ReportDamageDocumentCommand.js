const DocumentModel = require("../../../model/DocumentModel");
const {errorResponse} = require("../../../utility/ResponseHandler");
const {isValidObjectId} = require('mongoose')
const encrypt = require('node-file-encrypt');
const fs = require('fs')
const glob = require('glob')
const path = require('path')
const libre = require('libreoffice-convert');
libre.convertAsync = require('util').promisify(libre.convert);
/*
اگر به هر دلیلی پی دی اف سند ساخته شده مشکل داشت از این ماژول برای جایگزین کردن پی  دی اف استفاده میشه
منطق ساده ای داره
اصل فایل رو دی کد میکنیم بعد دوباره پی دی اف میکنیم و شناسه جدید فایل انکریپت شده پی دی اف رو در دیتابیس جایگزین میکنیم
*/
module.exports.reportDamageDocument = async (req,res)=>{
    // چون قصد برطرف کردن باگ سیستم هست نیاز به گارد نیست
    //چون نه اطلاعاتی به کاربر میدهیم نه تغییر خاصی در سامانه رخ میده

    const {id} = req.params

    if(!isValidObjectId(id) || id.length<8)
        return errorResponse(res,5)


    glob("uploads\\\\"+"*",{"ignore":["uploads\\\\"+'*.crypt']}, async function (err, files) {
        for (let i = 0; i < files.length; i++) {
            if(!isValidObjectId(files[i].substr(files[i].lastIndexOf("/")+1,files[i].length-1))){
                await fs.unlinkSync(files[i])


                const document = await DocumentModel.findById(id).lean()



                if(document.ex!=="png" && document.ex!=="jpg" && document.ex!=="jpge" && document.ex!=="docx" && document.ex!=="xlsm" && document.ex!=="txt")
                    return errorResponse(res,"این سند مشکلی ندارد")

                if(!document.isActive)
                    return errorResponse(res,"این سند فعال نمیباشد")

                const path = "uploads\\\\" + document._id + "." +  document.ex
                let encryptPath = "uploads\\\\\\\\" + document.uniqueFileId

                let fr = new encrypt.FileEncrypt(encryptPath);
                fr.openSourceFile();
                let outputPath
                await fr.decrypt(process.env.encryptKey,async ()=>{
                    const ext = '.pdf'
                    const inputPath = path;
                    outputPath = path.substr(0,path.lastIndexOf("."))+".pdf"

                    const docxBuf = await fs.readFileSync(inputPath);



                    let pdfBuf = await libre.convertAsync(docxBuf, ext, undefined);



                    await fs.writeFileSync(outputPath, pdfBuf);

                    let encryptPdfName = '';
                    let f = new encrypt.FileEncrypt(outputPath);
                    f.openSourceFile();
                    f.encrypt(process.env.encryptKey);
                    encryptPdfName = f.encryptFileName;

                    await DocumentModel.findByIdAndUpdate(id,{
                        $set:{
                            uniquePdfFileId:encryptPdfName
                        }
                    })

                })
                setTimeout(async ()=>{
                    await fs.unlinkSync("uploads\\\\" + document.uniquePdfFileId)
                    await fs.unlinkSync("uploads\\\\" + document._id + ".pdf")
                    await fs.unlinkSync("uploads\\\\" + document._id + "." + document.ex)

                    return res.send(true)
                },2000)
            }
        }
    })



}

const {roleGuard} = require("../../../authUtilities/Auth");
const glob = require("glob")
const DocumentModel = require("../../../model/DocumentModel");
const fs = require('fs')
const JSZip = require("jszip");
const AdmZip = require("adm-zip");
const {checkUserArchiveAccess} = require("../../user/query/CheckUserArchiveAccess");
const {errorResponse} = require("../../../utility/ResponseHandler");
const encrypt = require('node-file-encrypt');
const libre = require('libreoffice-convert');
libre.convertAsync = require('util').promisify(libre.convert);


module.exports.getGroupDocumentsFile = async (req,res)=>{
    await roleGuard(["نمایش سندها"],req,res)
    if(res.statusCode>399)
        return errorResponse(res,6)

    let {
        //برای اسناد انتخاب شده
        documents,

        //برای دریافت همه اسناد
        getAll,fileId

    } = req.body


    if(getAll){
        documents = await DocumentModel.find({
            fileId,
            isActive:true
        }).lean()
    }else{
        const isFind = checkUserArchiveAccess(req.user.userId)
        if(!isFind) errorResponse(res,"شما به این بایگانی دسترسی ندارید")

        let archiveId = documents[0].archiveId
        let file = documents[0].fileId
        let isDif = false

        documents.map(d=>{
            if(d.archiveId!==archiveId || d.fileId!==file)
                isDif = true
        })
        if(isDif) errorResponse(res,"تمامیه اسناد باید از یک بایگانی و یک پرونده باشد")


    }



    //حذف اسناد decrypt شده در اسناد
    glob("uploads\\\\"+"*",{"ignore":["uploads\\\\"+'*.crypt']}, async function (err, files) {
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
    })


    const zipName = Date.now() + ".zip"
    const zip = new AdmZip();

    //برای decrypt کردن فایل
    for (let i = 0; i < documents.length; i++) {
        let encryptPath = "uploads\\\\"
        if(documents[i].ex==="png"||documents[i].ex==="jpg"||documents[i].ex==="jpge"||documents[i].ex==="docx"||documents[i].ex==="xlsm" || documents[i].ex==="xlsx"||documents[i].ex==="txt"){
            encryptPath += documents[i].uniquePdfFileId
        }else{
            encryptPath += documents[i].uniqueFileId
        }

        let fr = new encrypt.FileEncrypt(encryptPath);
        fr.openSourceFile();
        await fr.decryptAsync(process.env.encryptKey,async ()=>{

            /*if(documents[i].ex==="png"||documents[i].ex==="jpg"||documents[i].ex==="jpge"||documents[i].ex==="docx"||documents[i].ex==="xlsm" || ex==="xlsx"||documents[i].ex==="txt"){
                const file = await fs.readFileSync("uploads\\\\\\\\" + documents[i]._id + ".pdf")
                console.log("pdf")
                console.log(file)
                zip.addFile(documents[i].title + ".pdf",file)

            }else{
                const file = await fs.readFileSync("uploads\\\\\\\\" + documents[i]._id + "." +  documents[i].ex)
                console.log("other")
                console.log(file)
                zip.addFile(documents[i].title + "." + documents[i].ex,file)
            }*/
        })
    }

    //زیپ کردن اسناد
    glob("uploads\\\\"+"*",{"ignore":["uploads\\\\"+'*.crypt']}, async function (err, files) {
        for (let i = 0; i < files.length; i++) {

            let isFind = false

            for (let j = 0; j < documents.length; j++) {
                if(files[i].substr(files[i].lastIndexOf("/")+1,files[i].length-1).includes(documents[j]._id)){
                    isFind = true
                }
            }
            if(isFind){
                if(!files[i].includes("."))
                    continue
                console.log(files[i])
                console.log(files[i].substr(files[i].indexOf("/")+1,files[i].length))
                const file = await fs.readFileSync(files[i])
                zip.addFile(files[i].substr(files[i].indexOf("/")+1,files[i].length) ,file)
            }

        }
        zip.writeZip("uploads\\\\" + zipName,(error => {
            console.log(error)
        }));
        return res.send(fs.readFileSync("uploads\\\\" + zipName))
    })



}

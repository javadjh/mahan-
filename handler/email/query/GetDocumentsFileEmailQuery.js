const EmailModel = require("../../../model/EmailModel");
const {daysCalculate} = require("../../../utility/dateUtility");
const {isValidObjectId} = require('mongoose')
const {errorResponse} = require("../../../utility/ResponseHandler");
const glob = require("glob")
const path = require('path')
const DocumentModel = require("../../../model/DocumentModel");
/*
دریافت سند با استفاده از ای دی ایمیل
از توی uploads پوشه ای با نام ای دی email وجود داره که توی اون اسناد هست
*/
module.exports.getDocumentsFileEmail = async (req,res)=>{
    //document And emailId
    let {documentId,emailId,userName,password} = req.query
    if(!isValidObjectId(documentId) || !isValidObjectId(emailId)) return errorResponse(res,5)
    const email = await EmailModel.findById(emailId)

    //todo add last version of document
    const lastDocumentVersion = await DocumentModel.find({
        mainParent:documentId,
        isMain:false
    }).limit(1).sort({version:1})
    console.log(lastDocumentVersion)
    /*if(lastDocumentVersion.length>0)
        documentId = lastDocumentVersion[0]._id*/

    let days = daysCalculate(email.expireDate,new Date)
    if(days<0){
        return errorResponse(res,"این اشتراک منسوخ شده")
    }

    console.log(userName)
    console.log(password)

    const emailsUser = await EmailModel.findOne({
        usersReceiver:{
            $elemMatch:{
                _id:userName,
                password:password
            }
        }
    })
    console.log(emailsUser)
    if(!emailsUser) return errorResponse(res,"شما به این ایمیل دسترسی ندارید.")

    let route = path.join(__dirname + "../" + "../" + "../" + "../" + "/uploads/" + email._id + "/" + documentId +  ".*")
    /*if(lastDocumentVersion.length>0){
        route = path.join(__dirname + "../" + "../" + "../" + "../" + "/uploads/"  + documentId +  ".*")
    }
    */
    glob(route,(err,files)=>{
        console.log( files[0])
        if(files.length>0){
            setTimeout(()=>{
                res.sendFile(path.join(files[0]))
            },1000)
        }
    })

}

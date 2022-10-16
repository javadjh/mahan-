const EmailModel = require("../../../model/EmailModel");
const {convertToShamsi} = require("../../../utility/dateUtility");
const {daysCalculate} = require("../../../utility/dateUtility");
const {errorResponse} = require("../../../utility/ResponseHandler");
const {roleGuard} = require("../../../authUtilities/Auth");

/*
برای دریافت لیست اسناد یک ایمیل از این ماژول استفاده می شود
با رمز و یوزر موقت وارد میشه
*/
module.exports.getEmailsDocuments = async (req,res)=>{


    const {id,userName,password} = req.query


    console.log(userName)
    console.log(password)

    const emailsUser = await EmailModel.findOne({
        usersReceiver:{
            $elemMatch:{
                _id:userName,
                password:password
            }
        }
    }).populate("fileId")
    console.log(emailsUser)
    if(!emailsUser) return errorResponse(res,"شما به این ایمیل دسترسی ندارید.")

    const email = await EmailModel.findById(id).populate("documents fileId").populate("creator","firstName lastName userName").lean()

    email.documents.map(d=>{
        d.createDate = convertToShamsi(d.createDate)
    })


    let days = daysCalculate(new Date,email.expireDate)
    if(new Date>email.expireDate){
        return errorResponse(res,"این اشتراک منسوخ شده")
    }

    email.createDate = convertToShamsi(email.createDate)
    email.expireDate = convertToShamsi(email.expireDate)

    return res.send(email)
}

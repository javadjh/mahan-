const EmailModel = require("../../../model/EmailModel");
const {convertToShamsi} = require("../../../utility/dateUtility");
const {roleGuard} = require("../../../authUtilities/Auth");
const {isValidObjectId} = require('mongoose')
const {errorResponse} = require("../../../utility/ResponseHandler");

/*
برای دریافت ایمیل های ارسال شده در پرونده استفاده می شود
*/
module.exports.getFilesEmailsHistory = async (req,res)=>{
    await roleGuard(["اشتراک گذاری اسناد با ایمیل"],req,res)
    if(res.statusCode>399)
        return errorResponse(res,6)
    //file Id
    const {id} = req.params

    if(!isValidObjectId(id)) return errorResponse(res,5)

    const emailsHistory = await EmailModel.find({
        fileId:id,
        creator:req.user.userId
    }).sort({createDate:-1}).populate("documents","title")
        .sort({createDate:-1})
        .limit(5)
        .lean()

    emailsHistory.map(e=>{
        e.createDate = convertToShamsi(e.createDate)
        e.expireDate = convertToShamsi(e.expireDate)
    })

    return res.send(emailsHistory)
}

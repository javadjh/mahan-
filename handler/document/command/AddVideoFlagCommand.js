const DocumentModel = require("../../../model/DocumentModel");
const {insertDocumentFlagValidator} = require("../../../validator/DocumentValidator");
const {errorResponse} = require("../../../utility/ResponseHandler");
const {roleGuard} = require("../../../authUtilities/Auth");
const {insertLog} = require("../../log/command/InsertLogCommand");
/*
با استفاده از این ماژول میتوانید برای سند ویدیویی تگ بزارید
*/
module.exports.addVideoFlag = async (req,res)=>{
    await roleGuard(["ویرایش سند"],req,res)
    if(res.statusCode>399)
        return errorResponse(res,6)
    const {documentId,description,startSecond,endSecond} = req.body

    const {error} = insertDocumentFlagValidator(req.body)
    if(error) {
        await insertLog(req,"خطا در ثبت برچسب ویدیو",`کاربر اطلاعات را درست وارد نکرده`,true,"سند", documentId)
        return errorResponse(res,error.message)
    }

    let document = await DocumentModel.findById(documentId)

    if(document.videoFlags===undefined){
        document.videoFlags = []
    }

    document.videoFlags.push({description,startSecond,endSecond})

    document = await document.save()

    await insertLog(req,"ثبت برچسب ویدیو",`کاربر بر روی ویدیو ${document.title} برچسب ${description} را وارد کرد`,true,"سند",document._id)

    return res.send(document)
}

const FormModel = require("../../../model/FormModel");
const ArchiveModel = require("../../../model/ArchiveModel");
const {checkAccessForAllUsersArchive} = require("../../user/query/checkAccessForAllUsersArchive");
const {insertLog} = require("../../log/command/InsertLogCommand");
const {errorResponse} = require("../../../utility/ResponseHandler");
const {roleGuard} = require("../../../authUtilities/Auth");
const {isValidObjectId} = require('mongoose')
const ArchiveTreeModel = require("../../../model/ArchiveTree");
//خیلی ساده میتوانیم فرم را غیر فعال کنیم
module.exports.deleteForm = async (req,res)=>{
    // roleGuard(['افزودن فرم'],req,res)

    //['افزودن فرم']
    const archiveIds = await checkAccessForAllUsersArchive(["61e3caf7d6d14316ac387bc4"],req.user.userId)

    if(archiveIds.length===0)
        return errorResponse(res,6)

    if(!isValidObjectId(req.params.id))  {
        await insertLog(req,"حذف فرم",`کاربر شناسه فرم را اشتباه ارسال کرده است`,false,"فرم")
        return errorResponse(res,5)
    }

    const isFindArchive = await ArchiveTreeModel.find({
        form:req.params.id,
        isMain:true,
        isFormRequired:true
    })

    let archives = "بایگانی های : "
    isFindArchive.map(a=>{
        archives += a.title + " , "
    })

    if(isFindArchive.length>0) return errorResponse(res,archives + " \n" + "از این فرم استفاده کرده اند")

    const deletedForm = await FormModel.findByIdAndUpdate(req.params.id,{
        $set:{
            isActive:false
        }
    })

    if(!deletedForm) {
        await insertLog(req,"حذف فرم",`خطا در حذف فرم رخ داد`,false,"فرم")
        return errorResponse(res,3)
    }

    await insertLog(req,"حذف فرم",`یک فرم با موفقیت حذف شد`,true,"فرم")
    return res.send(true)
}

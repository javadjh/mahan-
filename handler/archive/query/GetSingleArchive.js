const UserModel = require("../../../model/UserModel");
const ArchiveModel = require("../../../model/ArchiveModel");
const FormModel = require("../../../model/FormModel");
const {errorResponse} = require("../../../utility/ResponseHandler");
const {insertLog} = require("../../log/command/InsertLogCommand");
const {roleGuard} = require("../../../authUtilities/Auth");
const {isValidObjectId} = require('mongoose')

/*
* دریافت اطلاعات یک بایگانی خاص با استفاده از شناسه آن
*/

module.exports.getSingleArchive = async (req,res)=>{
    await roleGuard(['ثبت اطلاعات تکمیلی برای بایگانی'],req,res)
    if(res.statusCode>399)
        return errorResponse(res,6)

    if(!isValidObjectId(req.params.id)){
        await insertLog(req,'خطا در دریافت بایگانی','شناسه ای که کاربر ارسال کرده نادرست میباشد',false,'بایگانی')
        return errorResponse(res,5)
    }

    const user = await UserModel.findById(req.user.userId).select("role")
    console.log(user)
    let isFind = false
    user.role.map(r=>{
        if(r.archiveId.toString()===req.params.id.toString())
            isFind = true
    })

    if(!isFind) {
        await insertLog(req,'خطا در دریافت بایگانی','کاربر به بایگانی درخواست داده است که به آن دسترسی ندارد - این کاربر از سامانه به درستی استفاده نمیکند',false,'بایگانی')
        return errorResponse(res,"شما دسترسی به این بایگانی را ندارید")
    }


    const archive = await ArchiveModel.findById(req.params.id)
    const forms = await FormModel.find({
        isActive:true
    }).select("title")

    await insertLog(req,'دریافت بایگانی','دریافت اطلاعات بایگانی توسط این کاربر',true,'بایگانی')

    return res.send({
        archive,
        forms
    })

}

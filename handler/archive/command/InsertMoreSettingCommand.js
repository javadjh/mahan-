const ArchiveModel = require("../../../model/ArchiveModel");
const FileModel = require("../../../model/FileModel");
const {insertMoreSettingValidator} = require("../../../validator/ArchiveValidator");
const {errorResponse} = require("../../../utility/ResponseHandler");
const {roleGuard} = require("../../../authUtilities/Auth");
const {isValidObjectId} = require('mongoose')
const {insertLog} = require("../../log/command/InsertLogCommand");

/*
ثبت اطلاعات تکمیلی برای بایگانی که در قسمت archiveTrees ثبت می شود
watermarkText:متن اضافه بر آدرس درخت و کد دیجیتال
maxFileSize:حداکثر سایز فایل برای آپلود سند
isFormRequired:آیا فرم یا روکش سند اجباری میباشد؟
isDigitalCodeGeneratedWithSystem:آیا کد دیجیتال توسط سیستم ساخته شود یا خود کاربر وارد میکند؟
 */
module.exports.insertMoreSetting = async (req,res)=>{
    await roleGuard(['ثبت اطلاعات تکمیلی برای بایگانی','انتخاب فرم برای بایگانی'],req,res)

    if(res.statusCode>399)
        return errorResponse(res,6)

    if(!isValidObjectId(req.params.id)) {
        await insertLog(req,'خطا در ثبت اطلاعات تکمیلی بایگانی','شناسه ارسال شده معتبر نمیباشد - کاربر از سامانه به درستی استفاده نمیکند',false,'بایگانی')
        return errorResponse(res,5)
    }

    const {error} = insertMoreSettingValidator(req.body)
    if(error){
        await insertLog(req,'خطا در ثبت اطلاعات تکمیلی بایگانی','اطلاعات وارد شده توسط کاربر مشکل دارد',false,'بایگانی')
        return errorResponse(res,error.message)
    }

    let moreSetting = await ArchiveModel.findByIdAndUpdate(req.params.id,{
        $set:req.body
    })

    if(req.body.form!==moreSetting.form){
        //بروزرسانی فرم همه پرونده ها
        await FileModel.updateMany({
            archiveId:req.params.id
        },{
            $set:{
                form:[]
            }
        })
    }

    await insertLog(req,'بروزرسانی اطلاعات بایگانی','کاربر اطلاعات پایه بایگانی را ویرایش کرد',true,'بایگانی')

    return res.send(moreSetting)

}

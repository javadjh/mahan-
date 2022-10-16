const FileModel = require("../../../model/FileModel");
const FormModel = require("../../../model/FormModel");
const ArchiveTreeModel = require("../../../model/ArchiveTree");
const {roleGuard} = require("../../../authUtilities/Auth");
const {isValidObjectId} = require('mongoose')
const {errorResponse} = require("../../../utility/ResponseHandler");

//ارسال فرم انتخاب شده در قسمت تنظیمات و همچنین ارسال اطلاعات مورد نیاز برای ثبت فرم و اگر ثبت کرده بود اطلاعات قبلی فرم قابل مشاهده باشه
module.exports.getArchivesForm = async (req,res)=>{
    await roleGuard(['ویرایش روکش پرونده',"ناظر"],req,res)
    if(res.statusCode>399)
        return errorResponse(res,6)

    const {fileId} = req.params

    if(!isValidObjectId(fileId)) return errorResponse(res,5)

    const file = await FileModel.findById(fileId).populate({
        path: 'archiveTreeId',
        populate: {
            path: 'archive',
            model: 'archive'
        },
    })

    // const form = await FormModel.findById(file.archiveTreeId.archive.form).lean()

    let form
    if(file.hasSpecialForm){
        form = await FormModel.findById(file.formSelected)
    }else{
        let mainArchiveTree = await ArchiveTreeModel.findById(file.mainArchiveTreeId).populate("form").select("form")
        form = mainArchiveTree.form
    }

    return res.send({
        form,
        filesForm:file.form
    })

}

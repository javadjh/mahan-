const ArchiveTreeModel = require("../../../model/ArchiveTree");
const {errorResponse} = require("../../../utility/ResponseHandler");
const {isValidObjectId} = require('mongoose')
const {insertLog} = require("../../log/command/InsertLogCommand");
const {roleGuard} = require("../../../authUtilities/Auth");

/*
برای تنظیمات درخت استفاده می شود - > تغییر زبان درخت
 */
module.exports.changeArchiveTreeSetting = async (req,res)=>{
    await roleGuard(["مدیریت درخت"],req,res)

    if(!isValidObjectId(req.params.id)) errorResponse(res,5)
    const editArchiveTree = await ArchiveTreeModel.findByIdAndUpdate(req.params.id,{
        $set:{
            lang:req.body.lang
        }
    },{new:true})

    if(!editArchiveTree) {
        await insertLog(req,"ویرایش تنظیمات درخت",`خطا در بروزرسانی درخت رخ داد`,false,"درخت")
        return errorResponse(res,4)
    }


    await insertLog(req,"ویرایش تنظیمات درخت",`با موفقیت کاربر تنظیمات مربوط به درخت ${editArchiveTree.title} را تغییر داد`,true,"درخت")
    return res.send(editArchiveTree)
}

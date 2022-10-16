const ArchiveModel = require("../../../model/ArchiveModel");
const ArchiveTreeModel = require("../../../model/ArchiveTree");
const {insertLog} = require("../../log/command/InsertLogCommand");
const {insertArchiveValidator} = require("../../../validator/ArchiveValidator");
const {errorResponse} = require("../../../utility/ResponseHandler");
const {roleGuard} = require("../../../authUtilities/Auth");
const {isValidObjectId} = require("mongoose")
//بروزرسانی اطلاعات پایه یک بایگانی میباشد
module.exports.updateArchive = async (req,res)=>{
    roleGuard(['ایجاد بایگانی'],req,res)

    const {error} = insertArchiveValidator(req.body)
    if(error) {
        await insertLog(req,"افزودن بایگانی",`یک بایگانی با موفقیت ثبت شد`,true,"بایگانی")
        return errorResponse(res,error.message)
    }
    if(!isValidObjectId(req.params.id)) return errorResponse(res,5)

    const archiveUpdated = await ArchiveModel.findByIdAndUpdate(req.params.id,{
        $set:req.body
    })

    if(!archiveUpdated) return errorResponse(res,4)

    await insertLog(req,"ویرایش بایگانی",`توسعه دهنده بایگانی را ویرایش کرد`,true,"بایگانی")

    //برای ویرایش تمام آدرس های قفسه ها
    const archiveTrees = await ArchiveTreeModel.find({
        isActive:true,
        archive:archiveUpdated._id
    })

    for (let i = 0; i < archiveTrees.length; i++) {
        await ArchiveTreeModel.findByIdAndUpdate({
            _id:archiveTrees[i]._id
        },{
            route:archiveTrees[i].route.replace(archiveUpdated.title,req.body.title)
        })
    }


    return res.send(archiveUpdated)
}

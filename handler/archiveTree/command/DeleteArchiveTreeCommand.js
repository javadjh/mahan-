const ArchiveTreeModel = require("../../../model/ArchiveTree");
const FileModel = require("../../../model/FileModel");
const {errorResponse} = require("../../../utility/ResponseHandler");
const {roleGuard} = require("../../../authUtilities/Auth");
const {insertLog} = require("../../log/command/InsertLogCommand");

/*
اگر قفسه هیچ پرونده ای نداشت قابلیت حذف شدن دارد
*/
module.exports.deleteArchiveTree = async (req,res)=>{
    roleGuard(['مدیریت درخت'],req,res)
    if(res.statusCode>399)
        return errorResponse(res,6)

    const {id} = req.params

    let archiveTree = await ArchiveTreeModel.findById(id)

    const isFileFound = await FileModel.findOne({
        archiveTreeId:id,
        isActive:true
    })

    if(isFileFound!==null){
        await insertLog(req,"حذف قفسه",`کاربر در تلاش برای حذف یک قفسه که شامل پرونده بوده به شکست خورد`,false,"قفسه")
        return errorResponse(res,"این قفسه دارای پرونده میباشد")
    }


    const isArchiveTreeFound = await ArchiveTreeModel.findOne({
        mainParent:id,
        isActive:true
    })

    if(isArchiveTreeFound!==null){
        await insertLog(req,"حذف قفسه",`کاربر در تلاش برای حذف یک قفسه که شامل قفسه بوده به شکست خورد`,false,"قفسه")
        return errorResponse(res,"این قفسه دارای قفسه دیگر میباشد")
    }

    archiveTree.isActive = false

    archiveTree = await archiveTree.save()

    await insertLog(req,"حذف قفسه",`کاربر قفسه ${archiveTree.title} را حذف کرد`,false,"قفسه")

    return res.send(archiveTree)
}

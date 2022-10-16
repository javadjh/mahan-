const ArchiveModel = require("../../../model/ArchiveModel");
const {errorResponse} = require("../../../utility/ResponseHandler");
const FileModel = require("../../../model/FileModel");
const {convertToShamsi} = require("../../../utility/dateUtility");
module.exports.getArchivesFilesGuardSystem = async (req,res)=>{
    let {archiveId,pageId=1,eachPerPage=12} = req.query
    pageId = Number(pageId)
    eachPerPage = Number(eachPerPage)
    let skipPaging = (pageId-1)*eachPerPage

    const archive = await ArchiveModel.findById(archiveId)
    if(!archive?.guardSystem?.isActive) return errorResponse(res,"این بایگانی فاقد سیستم گارد ناظر میباشد")
    let files = []
    let total =0

    let baseFilter = {
        isConfirm:false,
        archiveId:archiveId
    }
    let accessRule = "دسترسی ناظر به این بایگانی ندارید"
    if(archive.guardSystem?.primitive?.toString()===req.user.userId){
        files = await FileModel.find({...baseFilter,...{waitingFor:"primitive",isWaiting:true}})
            .populate("creator","firstName lastName position")
            .populate("correspondence.creator","firstName lastName position")
            .skip(skipPaging)
            .limit(eachPerPage)
            .lean()
        total = await FileModel.find({...baseFilter,...{waitingFor:"primitive",isWaiting:true}}).count()
        accessRule = "تایید اولیه"

    }else if(archive.guardSystem?.audit?.toString()===req.user.userId){
        files = await FileModel.find({...baseFilter,...{waitingFor:"audit",isWaiting:true}})
            .populate("creator","firstName lastName position")
            .populate("correspondence.creator","firstName lastName position")
            .skip(skipPaging)
            .limit(eachPerPage)
            .lean()
        total = await FileModel.find({...baseFilter,...{waitingFor:"audit",isWaiting:true}}).count()
        accessRule = "ممیزی"
    }else if(archive.guardSystem?.finally?.toString()===req.user.userId){
        files = await FileModel.find({...baseFilter,...{waitingFor:"finally",isWaiting:true}})
            .populate("creator","firstName lastName position")
            .populate("correspondence.creator","firstName lastName position")
            .skip(skipPaging)
            .limit(eachPerPage)
            .lean()
        total = await FileModel.find({...baseFilter,...{waitingFor:"finally",isWaiting:true}}).count()
        accessRule = "تصویب کننده"
    }else{
        return  errorResponse(res,"شما ناظریت در این بایگانی ندارید")
    }

    files.map(file=>{
        file.fileDate = convertToShamsi(file.fileDate)
        file.createDate = convertToShamsi(file.createDate)
        file.correspondence.map(item=>{
            item.createDate = convertToShamsi(item.createDate)
        })
    })

    return res.send({
        pageId,
        eachPerPage,
        total,
        accessRule,
        files,
    })
}
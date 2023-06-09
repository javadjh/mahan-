const DocumentModel = require("../../../model/DocumentModel");
const FileModel = require("../../../model/FileModel");
const {convertToShamsi} = require("../../../utility/dateUtility");
const {byteToSize} = require("../../../utility/bytesToSize");
const {roleGuard} = require("../../../authUtilities/Auth");
const {errorResponse} = require("../../../utility/ResponseHandler");
const ArchiveModel = require("../../../model/ArchiveModel");

module.exports.getFileStatistic = async (req,res)=>{
    await roleGuard(["نمایش سندها","ناظر"],req,res)
    if(res.statusCode>399)
        return errorResponse(res,6)
    const {fileId} = req.params

    const documents = await DocumentModel.find({
        fileId,
        isActive:true
    }).populate("archiveId").lean()
    const file = await FileModel.findById(fileId)
        .populate("applicantId")
        .populate("archiveTreeId").lean()

    file.createDate = convertToShamsi(file.createDate)
    file.fileDate = convertToShamsi(file.fileDate)

    let exList = []
    documents.map(d=>{
        exList.push(d.ex)
    })

    let chartEx = []
    exList.map((e,docIndex)=>{
        if(chartEx.find(c=>c.ex===e)){
            let index = chartEx.findIndex(c=>c.ex===e)
            chartEx[index].value += 1
            chartEx[index].size += documents[docIndex].documentSize
        }else{
            chartEx.push({
                ex:e,
                value:1,
                size:documents[docIndex].documentSize
            })
        }
    })
    let totalCount =0
    let totalSize =0
    chartEx.map(c=>{
        totalCount = totalCount + c.value
        totalSize = totalSize + c.size
    })
    totalSize = byteToSize(totalSize)

    chartEx.map(c=>{
        c.percentage = ((c.value*100)/totalCount).toFixed(2)
        c.size = byteToSize(c.size)
    })

    const watermark = await ArchiveModel.findById(file.archiveId)


    res.send({
        archive:documents.archiveId,
        file,
        totalSize,
        totalCount,
        chartEx,
        archiveWatermark:watermark.watermarkText
    })
}

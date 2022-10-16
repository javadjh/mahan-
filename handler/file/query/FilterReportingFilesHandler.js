const {convertToShamsi} = require("../../../utility/dateUtility");
const FileModel = require("../../../model/FileModel");

//جهت بازگشت اسناد و تعداد کل آن ها به ماژول نمایش گزارش و دانلود گزارش به صورت اکسل
module.exports.FilterReportingFilesHandler = async (filterAction)=>{
    let {pageId,eachPerPage,legalPeople,people,applicants,startDate,endDate,isDes,sortBy,type,fileStatus} = filterAction

    pageId = Number(pageId)
    eachPerPage = Number(eachPerPage)

    if(!sortBy){
        sortBy = "createDate"
    }

    let filter = []



    let findFilter = {
        isActive:true,
    }

    if(legalPeople)
        filter.push({"contacts.value": {$in: legalPeople}})

    if(people)
        filter.push({"contacts.value": {$in: people}})

    if(applicants)
        findFilter.applicantId = {$in: applicants}
    if(type)
        findFilter.type = type
    if(fileStatus)
        findFilter.fileStatus = fileStatus

    if(startDate && endDate){

        startDate = startDate.substr(1,10)
        endDate = endDate.substr(1,10)
        findFilter.createDate = {
            $gt: startDate,
            $lt: endDate
        }
    }
    if(filter.length>0)
        findFilter.$or = filter

    const files = await FileModel.find(findFilter).sort({[sortBy]:isDes})
        .select("-fileCodeType -keyword -correspondence -supervisorReceiver")
        .populate("archiveTreeId","title route")
        .populate("archiveId" ,"title")
        .populate("creator" ,"firstName lastName userName")
        .skip((pageId-1)*eachPerPage)
        .limit(eachPerPage)
        .lean()

    const total = await FileModel.find(findFilter).count()

    files.map(f=>{
        f.createDate = convertToShamsi(f.createDate)
        try {
            f.fileDate = convertToShamsi(f.fileDate)
        }catch (e){
            f.fileDate ="-"
        }
    })

    return {files,total}
}

const express = require('express')
const {sendReportingFile} = require("../handler/file/query/SendReportingFileQuery");
const {sendReportingELSXFile} = require("../handler/file/query/SendReportingFileQuery");
const {getReportingFilterData} = require("../handler/file/query/GetReportingFilterDataQuery");
const {getReportingFile} = require("../handler/file/query/GetReportingFileQuery");
const {changeFilesArchiveTree} = require("../handler/file/command/ChangeFilesArchiveTreeCommand");
const {rejectFileCommand} = require("../handler/file/command/RejectFileCommand");
const {sendFileToSupervisor} = require("../handler/file/command/SendFileToSupervisorCommand");
const {getWaitingFiles} = require("../handler/file/query/GetWaitingFilesQuery");
const {confirmFile} = require("../handler/file/command/ConfirmFileCommand");
const {getImageDocument} = require("../handler/document/query/GetImageDocumentQuery");
const {searchEngine} = require("../handler/file/query/SearchEngineQuery");
const {searchFile} = require("../handler/file/query/SearchFileQuery");
const {deleteFile} = require("../handler/file/command/DeleteFileCommand");
const {updateFile} = require("../handler/file/command/UpdateFileCommand");
const {getSingleFile} = require("../handler/file/query/GetSingleFileQuery");
const {getArchiveFiles} = require("../handler/file/query/GetArchiveFilesQuery");
const {getFileStatistic} = require("../handler/file/query/GetFileStatisticQuery");
const {setFileFormData} = require("../handler/file/command/SetFileFormDataCommand");
const {getArchivesForm} = require("../handler/file/query/GetFileFormQuery");
const {getMainParentFiles} = require("../handler/file/query/GetMainParentFilesQuery");
const {getInsertFileInsertData} = require("../handler/file/query/GetInsertFileInsertDataQuery");
const {insertFile} = require("../handler/file/command/InsertFileCommand");
const {firstGuard} = require("../authUtilities/Auth");
const router = express.Router()


/*
@POST
@Body:{
    title,fileDate,fileCode,fileStatus,keyword,type,fileCodeType
}

@Access:{
    ویرایش پرونده
}
*/
router.post('/insert/file',firstGuard,insertFile)


/*
@PUT
@Body:{
    title,fileDate,fileCode,fileStatus,keyword,type,fileCodeType
}
@Params:id

@Access:{
    ویرایش پرونده
}
*/
router.put('/update/file/:id',firstGuard,updateFile)


/*
@GET
@Access:{
    ویرایش پرونده
}
*/
router.get('/insert/file/data',firstGuard,getInsertFileInsertData)


/*
@GET
@Params:id
*/
router.get('/archive/tree/files/:id',firstGuard,getMainParentFiles)





/*
@GET
@Params:fileId
@Access:{
    ویرایش روکش پرونده
}
*/
router.get('/file/form/:fileId',firstGuard,getArchivesForm)




/*
@PUT
@Params:id
@Body:[ChildrenSchema]
@Access:{
    ویرایش روکش پرونده
}
*/
router.put('/file/form/:id',firstGuard,setFileFormData)




/*
@PUT
@Params:id
@Body:[ChildrenSchema]
@Access:{
    ویرایش روکش پرونده
}
*/
router.get('/file/statistic/:fileId',firstGuard,getFileStatistic)




/*
@GET
@Params:id
@Body:[ChildrenSchema]
@Access:{
    ویرایش روکش پرونده
}
*/
router.get('/archives/file',firstGuard,getArchiveFiles)





/*
@GET
@Params:id
@Body:[ChildrenSchema]
@Access:{
    ویرایش پرونده
}
*/
router.get('/file/:id',firstGuard,getSingleFile)






/*
@DELETE
@Params:id
@Access:{
    حذف پرونده
}
*/
router.delete('/delete/file/:id',firstGuard,deleteFile)






/*
@GET
@Params:searchValue
*/
router.get('/search/file/:searchValue',firstGuard,searchFile)







/*
@GET
@Params:searchValue
@Response:file
*/
router.get('/search/engine',firstGuard,searchEngine)




/*
@GET
@Params:searchValue
@Response:file
@Access:{
    نمایش سندها
}
*/
router.get('/image/editor/file/:id',firstGuard,getImageDocument)




/*
@PUT
@Params:id(fileId)
@Response:Bool
@Access:{
    ناظر
}
*/
router.put('/file/confirm/:id',firstGuard,confirmFile)




/*
@GET
@Response:[files]
@Access:{
    ناظر
}
*/
router.get('/file/waiting',firstGuard,getWaitingFiles)




/*
@PUT
@Params:id(fileId)
@Body:{message}
@Response:{file}
@Access:{
    ایجاد سند
}
*/
router.put('/send/file/:id',firstGuard,sendFileToSupervisor)




/*
@PUT
@Params:id(fileId)
@Body:{message}
@Response:{file}
@Access:{
    ناظر
}
*/
router.put('/reject/file/:id',firstGuard,rejectFileCommand)




/*
@PUT
@body:{
    fileId,
    destinationArchiveTree:{archive(id),_id}
}
@Access:{
    ویرایش پرونده
}
*/
router.put('/change/files/archive/tree',firstGuard,changeFilesArchiveTree)




/*
@PUT
@Params:{pageId,eachPerPage,legalPeople,people,applicants,startDate,endDate,isDes,sortBy,type,fileStatus}
@Access:{
    گزارش گیری
}
*/
router.get('/reporting',firstGuard,getReportingFile)




/*
@GET
@Params:{pageId,eachPerPage,legalPeople,people,applicants,startDate,endDate,isDes,sortBy,type,fileStatus}
@Access:{
    گزارش گیری
}
*/
router.get('/reporting/filter/data',firstGuard,getReportingFilterData)




/*
@GET
@Params:{pageId,eachPerPage,legalPeople,people,applicants,startDate,endDate,isDes,sortBy,type,fileStatus}
@Access:{
    گزارش گیری
}
*/
router.get('/reporting/filter/file',firstGuard,sendReportingFile)



module.exports = router

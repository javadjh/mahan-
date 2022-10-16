const express = require('express')
const {getLogsFile} = require("../handler/log/query/GetLogsFileQuery");
const {getFileLogs} = require("../handler/log/query/GetFileLogsQuery");
const {getLogs} = require("../handler/log/query/GetLogsQuery");
const {firstGuard} = require("../authUtilities/Auth");
const router = express.Router()


/*
@GET
@Query:pageId,eachPerPage,method,searchValue,department
Response:{pageId,
        eachPerPage,
        searchValue,
        method,
        department,
        logs}

@Access:{
    تاریخچه تغییرات
}
 */
router.get('/logs',firstGuard,getLogs)


/*
@GET
@Query:pageId,eachPerPage,searchValue,fileId

@Access:{
    تاریخچه تغییرات
}
 */
router.get('/file/logs',firstGuard,getFileLogs)



/*
@GET
@Query:pageId,eachPerPage,searchValue,fileId

@Access:{
    تاریخچه تغییرات
}
 */
router.get('/logs/file',firstGuard,getLogsFile)


module.exports = router

const express = require('express')
const {getUsersFileAlerts} = require("../handler/fileAlert/query/GetUsersFileAlertsQuery");
const {getFileAlerts} = require("../handler/fileAlert/query/GetFileAlertsQuery");
const {firstGuard} = require("../authUtilities/Auth");
const {insertFileAlert} = require("../handler/fileAlert/command/InsertFileAlertCommand");
const {GetAllUsersFilesAlerts, getAllUsersFilesAlerts} = require("../handler/fileAlert/query/GetAllUsersFilesAlertsQuery");
const router = express.Router()





/*
@POST
@Body:fileId,archiveId,title,description,date
@Access:{
    ویرایش پرونده
}
*/
router.post('/insert/file/alert',[firstGuard],insertFileAlert)





/*
@GET
@Query:fileId,archiveId
@Access:{
    اگر کاربر به بایگانی دسترسی داشته باشد
}
*/
router.get('/alerts/file',[firstGuard],getFileAlerts)





/*
@GET
*/
router.get('/users/file/alerts',[firstGuard],getUsersFileAlerts)





/*
@GET
*/
router.get('/users/files/alerts',[firstGuard],getAllUsersFilesAlerts)



module.exports = router

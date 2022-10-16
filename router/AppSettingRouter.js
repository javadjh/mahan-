const express = require('express')
const {getAppSetting} = require("../handler/appSetting/query/GetAppSettingQuery");
const {updateAppSetting} = require("../handler/appSetting/command/UpdateAppSettingCommand");
const {firstGuard} = require("../authUtilities/Auth");
const {isProjectInit} = require("../handler/appSetting/query/IsProjectInitQuery");
const multer = require("multer");
const {getAppVersion} = require("../handler/appSetting/query/GetAppInfoQuery");
const {getAppInfo} = require("../handler/appSetting/query/GetAppInfoQuery");
const {changeAppSettingLogo} = require("../handler/appSetting/command/ChangeAppSettingLogoCommand");
const router = express.Router()


//آپلود سند
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'config/')
    },
    filename: function (req, file, cb) {
        cb(null,  Date.now()+"-"+file.originalname)
    }
})
const upload = multer({ storage: storage })


/*
@POST
@Body:{
    mailHost,
    mailPort,
    mailUser,
    mailPassword,
    mail
}
@Access:{
    مدیریت اطلاعات پایه
}
*/
router.post('/update/appSetting',firstGuard,updateAppSetting)



/*
@GET
@Access:{
    مدیریت اطلاعات پایه
}
*/
router.get('/appSetting',firstGuard,getAppSetting)



/*
@GET
@Access:{
    مدیریت اطلاعات پایه
}
*/
router.get('/app/status',isProjectInit)



/*
@GET
*/
router.get('/app/info',getAppInfo)



/*
@POST
*/
router.post('/change/app/setting/logo',[firstGuard,upload.single("file")],changeAppSettingLogo)






module.exports = router

const express = require('express')
const {getUsersArchivesDetail} = require("../handler/archive/query/GetUsersArchivesDetailQuery");
const {setFileFormData} = require("../handler/file/command/SetFileFormDataCommand");
const {getArchivesForm} = require("../handler/file/query/GetFileFormQuery");
const {getSingleArchive} = require("../handler/archive/query/GetSingleArchive");
const {insertMoreSetting} = require("../handler/archive/command/InsertMoreSettingCommand");
const {deleteArchive} = require("../handler/archive/command/DeleteArchiveCommand");
const {updateArchive} = require("../handler/archive/command/UpdateArchiveCommand");
const {getAllArchive} = require("../handler/archive/query/GetAllArchiveQuery");
const {insertArchive} = require("../handler/archive/command/InsertArchiveCommand");
const {firstGuard} = require("../authUtilities/Auth");
const {getArchiveGuardSystem} = require("../handler/archive/query/GetArchiveGuardSystemQuery");
const {setArchiveGuardSystem} = require("../handler/archive/command/SetArchiveGuardSystemCommand");
const {getArchivesFilesGuardSystem} = require("../handler/archive/query/GetArchivesFilesGuardSystemQuery");
const router = express.Router()


/*
@POST
@Body:{
    title,description,form
}
//disable
@Access:{
    ایجاد بایگانی
}
*/
router.post('/insert/archive',firstGuard,insertArchive)


/*
@PUT
@Body:{
    title,description,form
}
@Params:id
@Access:{
    ایجاد بایگانی
}
*/
router.put('/update/archive/:id',firstGuard,updateArchive)



/*
@GET
@Access:{
    ایجاد بایگانی
}
*/
router.get('/archives',firstGuard,getAllArchive)



/*
@DELETE
@Access:{
    ایجاد بایگانی
}
*/
router.delete('/archive/:id',firstGuard,deleteArchive)



/*
@PUT
@Body:watermarkText,maxFileSize,isFormRequired,isDigitalCodeGeneratedWithSystem
@Params:id
@Access:{
    ثبت اطلاعات تکمیلی برای بایگانی
}
*/
router.put('/more/info/archive/:id',firstGuard,insertMoreSetting)



/*
@GET
@Params:id
@Access:{
    ثبت اطلاعات تکمیلی برای بایگانی
}
*/
router.get('/single/archive/:id',firstGuard,getSingleArchive)



/*
@GET
//به اعتبار سنجی دسترسی نیازر نداره
*/
router.get('/users/archives/detail',firstGuard,getUsersArchivesDetail)




/*
@GET
@Params:id
*/
router.get('/archive/guard/system/:id',firstGuard,getArchiveGuardSystem)




/*
@POST
@Body:{archiveId,cycle,finallyUserId,auditUserId,primitiveUserId}
*/
router.post('/archive/guard/system',firstGuard,setArchiveGuardSystem)





/*
@POST
@Query:{archiveId,pageId=1,eachPerPage=12}
*/
router.get('/archives/files/guard/system',firstGuard,getArchivesFilesGuardSystem)



module.exports = router

const express = require('express')
const multer = require("multer");
const {reportDamageDocument} = require("../handler/document/command/ReportDamageDocumentCommand");
const {removeVideoFlag} = require("../handler/document/command/RemoveVideoFlagCommand");
const {addVideoFlag} = require("../handler/document/command/AddVideoFlagCommand");
const {restoreDocument} = require("../handler/document/command/RestoreDocumentCommand");
const {getDeActivateDocuments} = require("../handler/document/query/GetDeActivateDocumentsQuery");
const {changeDocumentFile} = require("../handler/document/command/ChangeDocumentFileCommand");
const {getGroupDocumentsFile} = require("../handler/document/query/GetGroupDocumentsFileQuery");
const {groupAddNoteDocument} = require("../handler/document/command/GroupAddNoteDocumentCommand");
const {groupDeleteDocument} = require("../handler/document/command/GroupDeleteDocumentCommand");
const {setDocumentsFile} = require("../handler/document/command/SetDocumentsFileCommand");
const {getLibrary} = require("../handler/document/query/GetLibraryQuery");
const {changeDocumentsName} = require("../handler/document/command/ChangeDocumentsNameCommand");
const {removeNoteFromDocument} = require("../handler/document/command/RemoveNoteFromDocumentCommand");
const {addNewNoteForDocument} = require("../handler/document/command/AddNoteForDocumentCommand");
const {getDocumentsFile} = require("../handler/document/query/GetDocumentsFileQuery");
const {getSingleDocument} = require("../handler/document/query/GetSingleDocumentQuery");
const {deleteDocument} = require("../handler/document/command/DeleteDocumentCommand");
const {getFileDocuments} = require("../handler/document/query/GetFileDocumentsQuery");
const router = express.Router()
const {insertDocument} = require("../handler/document/command/InsertDocumentCommand");
const {firstGuard} = require("../authUtilities/Auth");

//آپلود سند
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null,  Date.now()+"-"+file.originalname)
    }
})
const upload = multer({ storage: storage })

/*
@GET
@Access:{
    ایجاد سند
}
*/
router.post('/insert/document/:archiveId/:fileId/:uiId/:mainParent/:libraryShelfId',[firstGuard,upload.single("file")],insertDocument)

/*
@GET
@Query:fileId,pageId,eachPerPage,searchValue
@Access:{
    نمایش سندها
}
*/
router.get('/documents',[firstGuard],getFileDocuments)

/*
@DELETE
@Params:documentId
@Access:{
    حذف سند
}
*/
router.delete('/document/:documentId',[firstGuard],deleteDocument)

/*
@GET
@Params:documentId
@Access:{
    نمایش سندها
}
*/
router.get('/document/:id',[firstGuard],getSingleDocument)

/*
@GET
@Params:documentId
@Access:{
    نمایش سندها
}
*/
router.get('/document/file/:id',[firstGuard],getDocumentsFile)

/*
@POST
@Body:documentId,description
@Access:{
    ویرایش سندها
}
*/
router.post('/document/note',[firstGuard],addNewNoteForDocument)

/*
@DELETE
@Body:documentId,description
@Access:{
    ویرایش سندها
}
*/
router.delete('/document/note/:documentId/:id',[firstGuard],removeNoteFromDocument)

/*
@PUT
@Params:id
@Body:title
@Access:{
    ویرایش سندها
}
*/
router.put('/document/:id',[firstGuard],changeDocumentsName)




/*
@POST
@Body:{documents,archiveId,file}
@Access:{
    ایجاد سند
}
*/
router.post('/set/documents/file',[firstGuard],setDocumentsFile)


/*
@PUT
@Body:{documents}
@Access:{
    حذف سند
}
*/
router.put('/delete/group/documents',[firstGuard],groupDeleteDocument)


/*
@PUT
@Body:{documents}
@Access:{
    ویرایش سند
}
*/
router.put('/note/group/documents',[firstGuard],groupAddNoteDocument)


/*
@PUT
@Body:{documents}
@Access:{
    نمایش سندها
}
*/
router.put('/documents/file',[firstGuard],getGroupDocumentsFile)




/*
@PUT
@Body:{documents}
@Access:{
    نمایش سندها
}
*/
router.put('/move/documents',[firstGuard],changeDocumentFile)





/*
@PUT
@Body:{documents}
@Access:{
    مدیریت اسناد حذف شده
}
*/
router.get('/deactivate/documents',[firstGuard],getDeActivateDocuments)





/*
@DELETE
@Params:id
@Access:{
    مدیریت اسناد حذف شده
}
*/
router.delete('/restore/documents/:id',[firstGuard],restoreDocument)





/*
@POST
@Body:{description,second,documentId}
@Access:{
    ویرایش سند
}
*/
router.post('/add/video/flag',[firstGuard],addVideoFlag)





/*
@DELETE
@Params:documentId,flagId
@Access:{
    ویرایش سند
}
*/
router.delete('/remove/video/flag/:documentId/:flagId',[firstGuard],removeVideoFlag)





/*
@DELETE
@Params:documentId,flagId
@Access:{
    ویرایش سند
}
*/
router.put('/report/damage/document/:id',[firstGuard],reportDamageDocument)



module.exports = router

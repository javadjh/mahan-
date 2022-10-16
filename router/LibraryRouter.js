const express = require('express')
const {deleteGroupLibrariesDocument} = require("../handler/document/command/DeleteGroupLibrariesDocumentCommand");
const {getDocumentsFilePreviewLibrary} = require("../handler/document/query/GetDocumentsFilePreviewLibraryQuery");
const {getLibraryShelfDocuments} = require("../handler/libraryShelf/query/GetLibraryShelfDocumentsQuery");
const {deleteLibraryShelf} = require("../handler/libraryShelf/command/DeleteLibraryShelfCommand");
const {updateLibraryShelf} = require("../handler/libraryShelf/command/UpdateLibraryShelfCommand");
const {getLibrary} = require("../handler/document/query/GetLibraryQuery");
const {insertLibraryShelf} = require("../handler/libraryShelf/command/InsertLibraryShelfCommand");
const {deleteLibrariesFile} = require("../handler/document/command/DeleteLibrariesFileCoomand");
const {firstGuard} = require("../authUtilities/Auth");
const {getLibrariesFile} = require("../handler/document/query/GetLibrariesFileQuery");
const {moveDocumentsToLibraryShelf} = require("../handler/libraryShelf/command/MoveDocumentsToLibraryShelfCommand");
const router = express.Router()



/*
@GET
*/
router.get('/library/document',[firstGuard],getLibrary)

/*
@GET
@Response:File
*/
router.get('/library/document/:id',firstGuard,getLibrariesFile)

/*
@DELETE
@Params:id,libraryShelfId
@Response:Bool
*/
router.delete('/library/document/:id/:libraryShelfId',firstGuard,deleteLibrariesFile)


/*
@PUT
@Params:documentIds,libraryShelfId
@Response:Bool
*/
router.put('/delete/group/libraries/documents',firstGuard,deleteGroupLibrariesDocument)


/*
@POST
@Body:{title}
@Response:{Bool}
*/
router.post('/insert/library/shelf',firstGuard,insertLibraryShelf)


/*
@POST
@Params:id
@Body:{title}
@Response:{Bool}
*/
router.put('/update/library/shelf/:id',firstGuard,updateLibraryShelf)


/*
@DELETE
@Params:id
@Response:{Bool}
*/
router.delete('/library/shelf/:id',firstGuard,deleteLibraryShelf)


/*
@GET
@Params:id
@Response:[documents]
*/
router.get('/library/shelf/documents/:id',firstGuard,getLibraryShelfDocuments)


/*
@GET
@Params:id
@Response:file
*/
router.get('/library/preview/document/file/:id',firstGuard,getDocumentsFilePreviewLibrary)


/*
@POST
@Body:{documentsId,destinationShelfId}
@Response:Bool
*/
router.post('/move/documents/to/library/shelf',firstGuard,moveDocumentsToLibraryShelf)



module.exports = router

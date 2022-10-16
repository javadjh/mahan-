const express = require('express')
const {deleteLegalPerson} = require("../handler/legalPerson/command/DeleteLegalPersonCommand");
const {updateLegalPerson} = require("../handler/legalPerson/command/UpdateLegalPersonCommand");
const {insertLegalPerson} = require("../handler/legalPerson/command/InsertLegalPersonCommand");
const {firstGuard} = require("../authUtilities/Auth");
const {getLegalPeople} = require("../handler/legalPerson/query/getLegalPeopleQuery");
const {insertPeopleFromExcel} = require("../handler/utilityHandler/excelHandler/InsertPeopleFromExcel");
const multer = require("multer");
const {insertLegalPeopleFromExcel} = require("../handler/utilityHandler/excelHandler/InsertLegalPeopleFormExcel");
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
@GET
@Query: pageId,eachPerPage,searchValue
@Access:{
    مدیریت اشخاص حقوقی
}
*/
router.get('/legal/people',firstGuard,getLegalPeople)


/*
@POST
@Body: LegalPersonSchema
@Access:{
    مدیریت اشخاص حقوقی
}
*/
router.post('/insert/legal/person',firstGuard,insertLegalPerson)


/*
@PUT
@Body: LegalPersonSchema
@Params:id
@Access:{
    مدیریت اشخاص حقوقی
}
*/
router.put('/update/legal/person/:id',firstGuard,updateLegalPerson)



/*
@DELETE
@Params: id
@Access:{
    مدیریت اشخاص حقوقی
}
*/
router.delete('/legal/person/:id',firstGuard,deleteLegalPerson)






/*
@POST
@form-data:file (Excel)
*/
router.post('/insert/legal/people/from/excel',[firstGuard,upload.single("file")],insertLegalPeopleFromExcel)


module.exports = router

const express = require('express')
const {updatePerson} = require("../handler/person/command/UpdatePersonCommand");
const {deletePerson} = require("../handler/person/command/DeletePersonCommand");
const {insertPerson} = require("../handler/person/command/InsertPersonCommand");
const {getPeople} = require("../handler/person/query/getPeopleQuery");
const {firstGuard} = require("../authUtilities/Auth");
const multer = require("multer");
const {insertPeopleFromExcel} = require("../handler/utilityHandler/excelHandler/InsertPeopleFromExcel");
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
    مدیریت اشخاص حقیقی
}
*/
router.get('/people',firstGuard,getPeople)

/*
@POST
@Body: PersonSchema
@Access:{
    مدیریت اشخاص حقیقی
}
*/
router.post('/insert/person',firstGuard,insertPerson)

/*
@PUT
@Body: PersonSchema
@Params:id
@Access:{
    مدیریت اشخاص حقیقی
}
*/
router.put('/update/person/:id',firstGuard,updatePerson)


/*
@DELETE
@Params: id
@Access:{
    مدیریت اشخاص حقیقی
}
*/
router.delete('/person/:id',firstGuard,deletePerson)





/*
@POST
@form-data:file (Excel)
*/
router.post('/insert/people/from/excel',[firstGuard,upload.single("file")],insertPeopleFromExcel)

module.exports = router

const express = require('express')
const {getAllLend} = require("../handler/lend/query/GetAllLendQuery");
const {insertLend} = require("../handler/lend/command/InsertLend");
const {getLegalPeople} = require("../handler/legalPerson/query/getLegalPeopleQuery");
const {firstGuard} = require("../authUtilities/Auth");
const router = express.Router()


/*
@GET
@Query: pageId,eachPerPage,searchValue
@Access:{
    مدیریت اشخاص حقوقی
}
*/
router.post('/insert/lend',firstGuard,insertLend)



/*
@GET
@Response:[LendSchema]
*/
router.get('/lends',firstGuard,getAllLend)


module.exports = router

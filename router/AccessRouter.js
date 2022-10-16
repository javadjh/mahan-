const express = require('express')
const {getAllAccess} = require("../handler/access/query/getAllAccess");
const {firstGuard} = require("../authUtilities/Auth");
const router = express.Router()


/*
@GET
@Access:{
    الگوی دسترسی
}
*/
router.get('/access/:roleId',firstGuard,getAllAccess)


module.exports = router

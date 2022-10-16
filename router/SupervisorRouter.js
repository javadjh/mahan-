const express = require('express')
const {getSupervisorsFiles} = require("../handler/file/query/GetSupervisorsFilesQuery");
const {firstGuard} = require("../authUtilities/Auth");
const router = express.Router()


/*
@GET
@Access:{
    ناظر
}
*/
router.get('/supervisors/files',firstGuard,getSupervisorsFiles)



module.exports = router

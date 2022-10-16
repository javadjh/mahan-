const express = require('express')
const {deleteRole} = require("../handler/role/command/DeleteRoleCommend");
const {getAllRoles} = require("../handler/role/query/GetAllRolesQuery");
const {getSingleRole} = require("../handler/role/query/GetSingleRoleQuery");
const {updateRole} = require("../handler/role/command/UpdateRoleCommand");
const {firstGuard} = require("../authUtilities/Auth");
const {roleGuard} = require("../authUtilities/Auth");
const {insertRole} = require("../handler/role/command/insertRoleCommand");
const router = express.Router()


/*
@POST
@Body:{
    title,description,accessList:[]
}
@Access:{
    الگوی دسترسی
}
*/
router.post('/insert/role',firstGuard,insertRole)

/*
@PUT
@Body:{
    title,description,accessList:[]
}
@Params:id
@Access:{
    الگوی دسترسی
}
*/
router.put('/update/role/:id',firstGuard,updateRole)

/*
@GET
@Params:id
@Access:{
    الگوی دسترسی
}
*/
router.get('/role/:id',firstGuard,getSingleRole)

/*
@GET
@Access:{
    الگوی دسترسی
}
*/
router.get('/roles',firstGuard,getAllRoles)


/*
@DELETE
@Params:id
@Access:{
    الگوی دسترسی
}
*/
router.delete('/role/:id',firstGuard,deleteRole)


module.exports = router

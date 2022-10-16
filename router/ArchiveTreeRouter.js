const express = require('express')
const {setArchiveTreesMainParentForm} = require("../handler/archiveTree/command/SetArchiveTreesMainParentFormCommand");
const {searchArchivesTrees} = require("../handler/archiveTree/query/SearchArchivesTreesQuery");
const {deleteArchiveTree} = require("../handler/archiveTree/command/DeleteArchiveTreeCommand");
const {changeArchiveTreeSetting} = require("../handler/archiveTree/command/ChangeArchiveTreeSetting");
const {searchArchiveTree} = require("../handler/archiveTree/query/SearchArchiveTreeQuery");
const {changeArchiveTreeName} = require("../handler/archiveTree/command/ChangeArchiveTreeNameCommand");
const {getArchiveTree} = require("../handler/archiveTree/query/getArchiveTreeQuery");
const {firstGuard} = require("../authUtilities/Auth");
const {insertArchiveTree} = require("../handler/archiveTree/command/InsertArchiveTreeCommand");
const router = express.Router()


/*
@POST
@Body:{
    title,isMain,mainParent
}

@Access:{
    مدیریت درخت
}
*/
router.post('/insert/archive/tree',firstGuard,insertArchiveTree)


/*
@PUT
@Body:{
    title
}
Params:id
*/
router.put('/change/archive/trees/name/:id',firstGuard,changeArchiveTreeName)


/*
@GET
@Query:{
    isMain,mainParent
}
*/
router.get('/archive/trees',firstGuard,getArchiveTree)


/*
@GET
@Query:{
    searchValue
}
*/
router.get('/search/archive/trees',firstGuard,searchArchiveTree)


/*
@GET
@Params:id
@Body:{
    lang
}
*/
router.put('/setting/archive/trees/:id',firstGuard,changeArchiveTreeSetting)


/*
@GET
@Params:id
@Body:{
    lang
}
*/
router.delete('/archive/tree/:id',firstGuard,deleteArchiveTree)


/*
@GET
@Params:id
@Body:{
    lang
}
*/
router.get('/search/archives/trees',firstGuard,searchArchivesTrees)


/*
@GET
@Params:id
@Body:{
    lang
}
*/
router.put('/main/archive/trees/form/:archiveTreeId',firstGuard,setArchiveTreesMainParentForm)

module.exports = router

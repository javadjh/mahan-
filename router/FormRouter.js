const express = require("express");
const { formPreview } = require("../handler/form/query/FormPreviewQuery");
const { deleteForm } = require("../handler/form/command/DeleteFormCommand");
const { updateForm } = require("../handler/form/command/UpdateFormCommand");
const { getAllForms } = require("../handler/form/query/getAllFormsQuery");
const { firstGuard } = require("../authUtilities/Auth");
const { insertForm } = require("../handler/form/command/InsertFormCommand");
const { getForm } = require("../handler/form/query/getSingleFormQuery");
const router = express.Router();

/*
@POST
@Body:{
    title,description,children:[ChildrenSchema]
}

@Access:{
    افزودن فرم
}
*/
router.post("/insert/form", firstGuard, insertForm);

/*
@GET
@Access:{
    افزودن فرم
}
*/
router.get("/forms", firstGuard, getAllForms);

/*
@PUT
@Body:{
    title,description,children:[ChildrenSchema]
}
@Params : id
@Access:{
    افزودن فرم
}
*/
router.put("/update/form/:id", firstGuard, updateForm);

/*
@DELETE
@Params : id
@Access:{
    افزودن فرم
}
*/
router.delete("/form/:id", firstGuard, deleteForm);

/*
@DELETE
@Params : id
@Access:{
    افزودن فرم
}
*/
router.get("/form/preview/:id", firstGuard, formPreview);

/**
@GET
@Params : id

*/
router.get("/form/:id", firstGuard, getForm);

module.exports = router;

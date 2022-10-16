const ArchiveTreeModel = require("../../../model/ArchiveTree");
const {roleGuard} = require("../../../authUtilities/Auth");
const {errorResponse} = require("../../../utility/ResponseHandler");
const {isValidObjectId} = require('mongoose')
/*
در این ماژول میتولنید فرم قفسه مادر را انتخاب کنید تا همه قفسه های زیر مجموع از آن ارث ببرند و تمام پرونتده ها نیز همینطور
*/
module.exports.setArchiveTreesMainParentForm = async (req,res)=>{
    await roleGuard(['مدیریت درخت'],req,res)
    if(res.statusCode>399)
        return errorResponse(res,6)
    const {formSelected,isFormRequired} = req.body
    const {archiveTreeId} = req.params

    if(!isValidObjectId(archiveTreeId) || !isValidObjectId(formSelected) || archiveTreeId.length<7 || formSelected.length<7)
        return errorResponse(res,5)

    const archiveTree = await ArchiveTreeModel.findByIdAndUpdate(archiveTreeId,{
        $set:{
            form:formSelected,
            isFormRequired
        }
    })

    return res.send(archiveTree)
}

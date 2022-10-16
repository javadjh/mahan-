const FormModel = require("../../../model/FormModel");
const {isValidObjectId} = require("mongoose")
const {errorResponse} = require("../../../utility/ResponseHandler");
const {checkAccessForAllUsersArchive} = require("../../user/query/checkAccessForAllUsersArchive");

/*
ارسال فرم برای کاربر به صورت لیست
*/
module.exports.formPreview = async (req,res)=>{

    //['افزودن فرم']
    const archiveIds = await checkAccessForAllUsersArchive(["61e3caf7d6d14316ac387bc4"],req.user.userId)
    if(archiveIds.length===0)
        return errorResponse(res,6)


    const {id} = req.params
    if(!isValidObjectId(id) || id.length<8)
        return errorResponse(res,5)

    const form = await FormModel.findById(id).select("children")

    return res.send(form.children)
}

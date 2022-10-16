const DocumentModel = require("../../../model/DocumentModel");
const { isValidObjectId } = require('mongoose')
const {errorResponse} = require("../../../utility/ResponseHandler");
const {roleGuard} = require("../../../authUtilities/Auth");

module.exports.removeVideoFlag = async (req,res)=>{
    const {documentId,flagId} = req.params

    if(!isValidObjectId(documentId) || !isValidObjectId(flagId))
        return errorResponse(res,5)
    let document = await DocumentModel.findById(documentId)
    document.videoFlags.pull({
        _id:flagId
    })

    document = await document.save()

    return res.send(document)
}

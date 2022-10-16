const FileModel = require("../../../model/FileModel");
const {isValidObjectId} = require('mongoose')
const {errorResponse} = require("../../../utility/ResponseHandler");
const {roleGuard} = require("../../../authUtilities/Auth");

/*
دریافت لیست پرونده هایی که بایگانی آن دریافت شده
*/
module.exports.getArchiveFiles = async (req,res)=>{
    await roleGuard(["ایجاد سند","ناظر"],req,res)
    if(res.statusCode>399)
        return errorResponse(res,6)
    const {searchValue,archiveId} = req.query

    if(!isValidObjectId(archiveId)) return errorResponse(res,5)

    const files = await FileModel.find({
        archiveId,
        title:{$regex: searchValue, $options: 'i'},
        isActive:true,
        $or:[
            {$and: [{isConfirm: false}, {creator: req.user.userId}]},
            {isConfirm:true}
        ]
    }).lean()

    let filesFinal = []
    files.map(f=>{
        filesFinal.push({
            value:f._id,
            label:f.title
        })
    })

    return res.send(filesFinal)
}

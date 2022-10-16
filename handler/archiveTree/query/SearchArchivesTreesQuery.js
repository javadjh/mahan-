const {insertLog} = require("../../log/command/InsertLogCommand");

/*
جست و جوی درخت هخای یک بایگانی
نیاز به archiveId داره تا درخت اون رو نمایش بده
*/
const ArchiveTreeModel = require("../../../model/ArchiveTree");
const {roleGuard} = require("../../../authUtilities/Auth");
const {errorResponse} = require("../../../utility/ResponseHandler");

module.exports.searchArchivesTrees = async (req,res)=>{
    await roleGuard(["ویرایش پرونده"],req,res)
    if(res.statusCode>399)
        return errorResponse(res,6)

    const {archiveId,searchValue} = req.query
    const fileTrees = await ArchiveTreeModel.find({
        archive:archiveId,
        isActive:true,
        $or:[{title:{$regex: searchValue, $options: 'i'}},]
    }).limit(12)


    return res.send(fileTrees)
}

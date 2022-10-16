const ArchiveTreeModel = require("../../../model/ArchiveTree");
const {insertLog} = require("../../log/command/InsertLogCommand");
const {roleGuard} = require("../../../authUtilities/Auth");
const {errorResponse} = require("../../../utility/ResponseHandler");
module.exports.changeArchiveTreeName = async (req,res)=>{
    roleGuard(['مدیریت درخت'],req,res)
    if(res.statusCode>399)
        return errorResponse(res,6)
    //فقط و فقط اسم درخت عوض میشه
    let archiveTreeNameChanged = await ArchiveTreeModel.findById(req.params.id)

    archiveTreeNameChanged.title=req.body.title

    //برای تعویض مسیر
    let route = archiveTreeNameChanged.route
    let index = route.lastIndexOf("/")
    route = route.substr(0,index-2)
    route = route + " / " + req.body.title

    archiveTreeNameChanged.route = route


    archiveTreeNameChanged = await archiveTreeNameChanged.save()

    if(!archiveTreeNameChanged) {
        await insertLog(req,"تغییر نام یک درخت",`در تغییر نام درخت خطایی رخ داده است`,false,"بایگانی")
        return errorResponse(res,4)
    }

    await insertLog(req,"تغییر نام یک درخت",`نام یک درخت به ${req.body.title} تغییر کرد`,true,"بایگانی")

    return res.send(archiveTreeNameChanged)

}

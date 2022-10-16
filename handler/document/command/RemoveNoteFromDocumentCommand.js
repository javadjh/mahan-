const DocumentModel = require("../../../model/DocumentModel");
const {convertToShamsi} = require("../../../utility/dateUtility");
const {insertLog} = require("../../log/command/InsertLogCommand");
module.exports.removeNoteFromDocument = async (req,res)=>{
    const {documentId,id} = req.params

    let document = await DocumentModel.findById(documentId)
    document.notes.pull({
        _id:id
    })

    document = await document.save()

    document.notes.map(n=>{
        n.createDate = convertToShamsi(n.createDate)
    })
    await insertLog(req,"حذف یادداشت",`کاربر یک یادداشت به سندی با عنوان ${document.title} حذف کرد`,true,"سند",document.fileId)

    res.send(document)
}

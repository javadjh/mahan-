/*
برای دریافت تمامیه بایگانی ها استفاده می شود
 */
const ArchiveModel = require("../../../model/ArchiveModel");
const {insertLog} = require("../../log/command/InsertLogCommand");
const {convertToShamsi} = require("../../../utility/dateUtility");
const {roleGuard} = require("../../../authUtilities/Auth");
module.exports.getAllArchive = async (req, res)=>{
    roleGuard(['ایجاد بایگانی'],req,res)

    const archives = await ArchiveModel.find({isActive:true})
        .populate("form","title")
        .populate("creator","userName")
        .sort({createDate:-1})
        .lean()

    archives.map(a=>{
        a.createDate = convertToShamsi(a.createDate)
    })
    await insertLog(req,"دریافت بایگانی ها",`لیست بایگانی ها توسط این کاربر گرفته شده است`,true,"بایگانی")
    return res.send(archives)
}

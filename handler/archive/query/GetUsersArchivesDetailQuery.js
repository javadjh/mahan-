const UserModel = require("../../../model/UserModel");
const ArchiveModel = require("../../../model/ArchiveModel");
const {convertToShamsi} = require("../../../utility/dateUtility");
const {insertLog} = require("../../log/command/InsertLogCommand");
const {errorResponse} = require("../../../utility/ResponseHandler");
const {roleGuard} = require("../../../authUtilities/Auth");
/*
برای ارسال بایگانی با اطلاعات بیشتر از ماژول مورد استفاده قرار میگیرد
 */
module.exports.getUsersArchivesDetail = async (req,res)=>{
    await roleGuard(['ثبت اطلاعات تکمیلی برای بایگانی'],req,res)
    if(res.statusCode>399)
        return errorResponse(res,6)

    const usersArchive = await UserModel.findById(req.user.userId).select("role.archiveId").populate("role.archiveId","title").lean()

    if(!usersArchive) return errorResponse(res,2)
    await insertLog(req,"دریافت بایگانی های یک کاربر",`بایگانی هایی که یک کاربر به آن دسترسی دارد را دریافت نموده است`,true,"بایگانی")

    let archiveIds = []
    usersArchive.role.map(u=>{
        archiveIds.push(u.archiveId._id)
    })

    const archives = await ArchiveModel.find({
        _id:{
            $in:archiveIds
        },
        isActive:true
    }).populate("form","-children").select("title description createDate form").lean()

    archives.map(a=>{
        if(a.createDate)
            a.createDate = convertToShamsi(a.createDate)
        if (a.form && a.form.createDate)
            a.form.createDate = convertToShamsi(a.form.createDate)
    })

    await insertLog(req,'دریافت اطلاعات بایگانی','دریافت اطلاعات بایگانی های کاربر',true,'بایگانی')

    res.send(archives)

}

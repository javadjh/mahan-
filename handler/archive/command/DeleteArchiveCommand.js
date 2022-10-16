const ArchiveModel = require("../../../model/ArchiveModel");
const {insertLog} = require("../../log/command/InsertLogCommand");
const {errorResponse} = require("../../../utility/ResponseHandler");
const {roleGuard} = require("../../../authUtilities/Auth");
const {isValidObjectId} = require("mongoose")
const UserModel = require("../../../model/UserModel");

//حذف یک بایگانی
module.exports.deleteArchive = async (req,res)=>{
    roleGuard(['مدیریت بایگانی'],req,res)



    if(!isValidObjectId(req.params.id)) {
        await insertLog(req,"حذف بایگانی",`کاربر در تلاش برای حذف بایگانی بوده که شناسه آن اشتباه ارسال شده است`,false,"بایگانی")
        return errorResponse(res,5)
    }


    const deleteArchive = await ArchiveModel.findByIdAndUpdate(req.params.id,{
        $set:{isActive:false}
    },{new:true})


    if(!deleteArchive) {
        await insertLog(req,"حذف بایگانی",`کاربر در تلاش برای حذف بایگانی بوده و خطایی رخ داده`,false,"بایگانی")
        return errorResponse(res,3)
    }


    const developer = await UserModel.findById("626451c2ce31af260c2238be")
    const admin = await UserModel.findById("61e3f77540129135ec4d928f")


    let devRoles = []
    for (let i = 0; i < developer.role.length; i++) {
        if(developer.role[i].archiveId.toString()!==deleteArchive._id.toString()){
            devRoles.push(developer.role[i])
        }
    }

    let adminRoles = []
    for (let i = 0; i < admin.role.length; i++) {
        if(admin.role[i].archiveId.toString()!==deleteArchive._id.toString()){
            adminRoles.push(admin.role[i])
        }
    }

    developer.role = devRoles
    admin.role = adminRoles

    await developer.save()
    await admin.save()

    await insertLog(req,"حذف بایگانی",`یک بایگانی توسط این کاربر حذف شده است`,true,"بایگانی")

    return res.send(true)

}

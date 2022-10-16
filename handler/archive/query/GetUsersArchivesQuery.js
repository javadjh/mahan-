const UserModel = require("../../../model/UserModel");
const ArchiveModel = require("../../../model/ArchiveModel");
const {insertLog} = require("../../log/command/InsertLogCommand");
const {errorResponse} = require("../../../utility/ResponseHandler");
const {checkAccessForAllUsersArchive} = require("../../user/query/checkAccessForAllUsersArchive");


module.exports.getUsersArchives = async (req,res)=>{
    //نیاز به validation دسترسی ها نیست خود این end-point به قدر کافی validation داره
    //لیست بایگانی های کاربر را ارسال میکند- برای منو بالای صفحه میباشد
    const archives = await UserModel.findById(req.user.userId).select("role.archiveId").populate("role.archiveId","title description")
    if(!archives) return errorResponse(res,2)


    const archiveIds = await checkAccessForAllUsersArchive(["61ed21a69d89da17004e6d50",'623a01a1b42fb709ccedf5e8'],req.user.userId)


    const archivesList = await ArchiveModel.find({
        _id:{
            $in:archiveIds
        },
    }).select("title description").lean()


    //این تبدیل برای سمت کلاینت میباشد مگر نه نیازی نیست
    let archiveView = {
        _id: "",
        role:[]
    }
    archivesList.map(a=>{
        archiveView.role.push({
            archiveId:{
                _id:a._id,
                title:a.title,
                description:a.description
            }
        })
    })

    await insertLog(req,"دریافت بایگانی های یک کاربر",`بایگانی هایی که یک کاربر به آن دسترسی دارد را دریافت نموده است`,true,"بایگانی")

    return res.send(archiveView)
}

/*
مثال:
                                       -بایگانی
                            -قفسه(اصلی
            -قفسه (فرعی (بینهایت))
            -قفسه (فرعی (بینهایت))
       -قفسه (فرعی (بینهایت))
       -قفسه (فرعی (بینهایت))
            -قفسه (فرعی (بینهایت))
                            -قفسه(اصلی)
            -قفسه (فرعی (بینهایت))
                            -قفسه(اصلی)
 */

/*
دریافت درخت ها
اطلعات دریافتی:isMain - mainParent
اگر isMain true بود تمام درخت هایی که isMain true  ارسال می شود(میشه ریشه اصلی بایگانی)
اگر mainParent پر بود باید isMain false باشه
 */

const ArchiveTreeModel = require("../../../model/ArchiveTree");
const UserModel = require("../../../model/UserModel");
const FileModel = require("../../../model/FileModel");
const {getMainParentFiles} = require("../../file/query/GetMainParentFilesQuery");
const {insertLog} = require("../../log/command/InsertLogCommand");
const {errorResponse} = require("../../../utility/ResponseHandler");
const {roleGuard} = require("../../../authUtilities/Auth");
const {convertToShamsi} = require("../../../utility/dateUtility");
module.exports.getArchiveTree = async (req, res)=>{
    await roleGuard(["مشاهده قفسه ها","ناظر"],req,res)
    if(res.statusCode>399)
        return errorResponse(res,6)


    const {isMain,mainParent,archiveId} = req.query

    //چک میکنه یوقت کاربر بایگانی ای که بهش دسترسی نداره رو نفرستاده باشه
    const usersArchives = await UserModel.findById(req.user.userId).populate("role")
    let listArchives = []
    usersArchives.role.map(r=>{
        listArchives.push(r.archiveId)
    })
    if(listArchives.length<=0) {
        await insertLog(req,"دریافت درخت یک بایگانی",`این کاربر به هیچ بایگانی دسترسی ندارد`,false,"بایگانی")
        return errorResponse(res,"شما به هیچ بایگانی دسترسی ندارید")
    }

    if(!listArchives.includes(archiveId) && !isMain) {
        await insertLog(req,"دریافت درخت یک بایگانی",`این کاربر به بایگانی درخواست داده است که به آن دسترسی ندارد`,false,"بایگانی")
        return errorResponse(res,"شما به این بایگانی دسترسی ندارید")
    }

    const trees = await ArchiveTreeModel.find({
        archive:archiveId,
        isMain,
        mainParent,
        isActive:true
    }).populate("archive","title description availablePattern firstStringOfPattern isDigitalCodeGeneratedWithSystem isFormRequired")
        .populate("creator","firstName lastName userName").lean()

    trees.map(t=>{t.createDate = convertToShamsi(t.createDate)})

    const user = await UserModel.findById(req.user.userId).select("role")
    let fileAccess = []
    user.role.map(role=>{
        if(role.archiveId.toString()===req.headers.archive.toString()){
            fileAccess = role.fileAccess
        }
    })
    for (let i = 0; i < trees.length; i++) {
        trees[i].totalFileCount = await FileModel.find({
            archiveTreeId:trees[i]._id,
            isActive:true,
            isConfirm:true,
            type:{
                $in:fileAccess
            }
        }).count()
    }

    return res.send(trees)
}

const ArchiveTreeModel = require("../../../model/ArchiveTree");
const ArchiveModel = require("../../../model/ArchiveModel");
const {insertLog} = require("../../log/command/InsertLogCommand");
const {errorResponse} = require("../../../utility/ResponseHandler");
const {roleGuard} = require("../../../authUtilities/Auth");
const {isValidObjectId} = require('mongoose')
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
module.exports.insertArchiveTree = async (req,res)=>{

    await roleGuard(['مدیریت درخت'],req,res)
    if(res.statusCode>399)
        return errorResponse(res,6)

    const {title,isMain,mainParent,archiveId} = req.body

    /*
    چک کردن داده ها:
    اول باید ای دی ها چک شه
    حالا 2 حالت داریم : یا اصلی هست یا والد داره(اگر والد داشته باشه بی نهایت میتونه تو در تو بشه)
    حالت اول (اصلی):
    باید isMain true باشد و MainParent باید خالی باشه
    حالت دوم (والد دار):
    قاعدتا isMain باید false باشه باید شامل mainParent یا همون والد باشد

    --فیلد route:
    یک فیلد داریم به نام route که به ما مسیر اون درخت رو نشون میده و به صورت String ذخیره میشه:
    اگر isMain true بود -> نام بایگانی + عنوان دریافتی
    اگر isMain false بود -> مسیر mainParent + عنوان دریافتی
     */
    if(!isValidObjectId(mainParent) || !isValidObjectId(archiveId)) {
        await insertLog(req,"افزودن یک درخت",`افزودن یک درخت در سامانه به خطا بر خورد - دلیل آن ارسال اشتباه شناسه به سمت سرور میباشد`,false,"بایگانی")
        return errorResponse(res,5)
    }
    if(isMain && mainParent) {
        await insertLog(req,"افزودن یک درخت",`افزودن یک درخت در سامانه به خطا بر خورد-عدم رعایت شروط سرور`,false,"بایگانی")
        return errorResponse(res,"نمیتواند اصلی باشد و والد نیز داشته باشد")
    }
    if(!isMain && !mainParent) {
        await insertLog(req,"افزودن یک درخت",`افزودن یک درخت در سامانه به خطا بر خورد-عدم رعایت شروط سرور`,false,"بایگانی")
        return errorResponse(res,"نمیتواند هم اصلی نباشد و هم والد نداشته باشد")
    }


    const archiveName = await ArchiveModel.findById(archiveId).select("title").lean()

    const mainParentRoute = await ArchiveTreeModel.findById(mainParent).select("route")

    //حالا وقت اضافه کردن هست
    let newArchiveTree = await new ArchiveTreeModel({
        title,isMain,mainParent,
        //برای چه بایگانی ثبت بشه
        archive:archiveId,
        route:isMain?archiveName.title + " / " + title:mainParentRoute.route + " / " + title,
        creator:req.user.userId
    })
     if(!newArchiveTree) {
         await insertLog(req,"افزودن یک درخت",`افزودن یک درخت در سامانه به خطا بر خورد`,false,"بایگانی")
         return errorResponse(res,1)
     }

    newArchiveTree = await newArchiveTree.save()

    await insertLog(req,"افزودن یک درخت",`یک درخت در سامانه به نام ${title} ساخته شد`,true,"بایگانی")

    return res.send(newArchiveTree)


}

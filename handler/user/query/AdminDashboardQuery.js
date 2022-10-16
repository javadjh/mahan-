const UserModel = require("../../../model/UserModel");
const DocumentModel = require("../../../model/DocumentModel");
const FileModel = require("../../../model/FileModel");
const ArchiveModel = require("../../../model/ArchiveModel");
const {byteToSize} = require("../../../utility/bytesToSize");
const {errorResponse} = require("../../../utility/ResponseHandler");
const moment = require('jalali-moment')
const {convertToShamsi} = require("../../../utility/dateUtility");
/*
داشبورد مدیریت شامل اطلاعات :
*اسناد
-تعداد کل اسناد
-تعداد اسناد بدون پرونده
-تعداد اسناد امروز / هفته / ماه
-حجم کل اسناد
-حجم اسناد امروز / هفته / ماه


*پرونده
-تعداد پرونده ها
-تعداد پرونده های هر بایگانی
-تعداد پرونده های مخطومه / جاری / نیمه جاری
-تعداد پرونده های امروز / هفته / ماه
-عنوانی پرونده های امروز



لیست کاربران آنلاین
*/
module.exports.adminDashboard = async (req,res)=>{
    /*const user = await UserModel.findById(req.user.userId)
    if(user.isAdmin)
        return errorResponse(res,"شما ادمین نیستید")*/

    //ابزار ها
    const sevenDays = new Date();
    sevenDays.setDate(sevenDays.getDate()-7);

    const thirtyDay = new Date();
    thirtyDay.setDate(thirtyDay.getDate()-30);

    const inToday = new Date();
    var now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    console.log("startOfToday")
    console.log(startOfToday)


    //اسناد**************************

    //تعداد کل اسناد
    const totalDocuments = await DocumentModel.find({isActive:true}).count()

    //تعداد اسناد بدون پرونده (در کازیو)
    const totalLibrariesDocument = await DocumentModel.find({archiveId:undefined, fileId:undefined, isActive:true}).count()

    //تعداد اسناد امروز
    const totalTodayDocuments = await DocumentModel.find({
        createDate:{
            $gte:startOfToday
        },
        isActive:true
    }).count()


    //تعداد اسناد 7 روز گذشته
    const last7DayDocuments = await DocumentModel.find({
        createDate:{
            $gte: sevenDays ,
            $lte: startOfToday
        },
        isActive:true
    }).count()


    //تعداد اسناد 30 روز گذشته
    const last30DayDocuments = await DocumentModel.find({
        createDate:{
            $gte: thirtyDay,
            $lte: startOfToday
        },
        isActive:true
    }).count()

    //حجم کل اسناد
    const allDocumentsSize = await DocumentModel.find({isActive:true}).select("documentSize -_id")

    let totalSize = 0
    allDocumentsSize.map(d=>{totalSize += d.documentSize})
    totalSize = byteToSize(totalSize)


    //حجم اسناد امروز
    const allTodayDocumentsSize = await DocumentModel.find({
        createDate:{
            $gte:startOfToday
        },
        isActive:true
    }).select("documentSize -_id")
    let totalTodaySize = 0
    allTodayDocumentsSize.map(d=>{totalTodaySize += d.documentSize})
    totalTodaySize = byteToSize(totalTodaySize)


    //حجم اسناد 7 روز
    const all7DayDocumentsSize = await DocumentModel.find({
        createDate:{
            $gte: sevenDays ,
            $lte: startOfToday
        },
        isActive:true
    }).select("documentSize -_id")
    let total7DaySize = 0
    all7DayDocumentsSize.map(d=>{total7DaySize += d.documentSize})
    total7DaySize = byteToSize(total7DaySize)


    //حجم اسناد 30 روز
    const all30DayDocumentsSize = await DocumentModel.find({
        createDate:{
            $gte: thirtyDay,
            $lte: startOfToday
        },
        isActive:true
    }).select("documentSize -_id")
    let total30DaySize = 0
    all30DayDocumentsSize.map(d=>{total30DaySize += d.documentSize})
    total30DaySize = byteToSize(total30DaySize)


    //پرونده************************************
    //تعداد کل پرونده های فعال سامانه
    const totalFile = await FileModel.find({isActive:true,}).count()

    //تعداد پرونده های هر بایگانی
    const archives = await ArchiveModel.find({
        isActive:true
    }).select("_id title").lean()

    for (let i = 0; i < archives.length; i++) {
        archives[i].fileCount = await FileModel.find({
            isActive: true,
            archiveId: archives[i]._id,
        }).count()
    }


    //تعداد پرونده های مختومه
    const makhtomeCount = await FileModel.find({
        fileStatus:"مختومه",
        isActive:true
    }).count()

    //تعداد پرونده های نیمه جاری
    const nimeJari = await FileModel.find({
        fileStatus:"نیمه جاری",
        isActive:true
    }).count()

    //تعداد پرونده های نیمه جاری
    const jari = await FileModel.find({
        fileStatus:"جاری",
        isActive:true
    }).count()

    //تعداد پرونده های امروز
    const fileTodayCount = await FileModel.find({
        createDate:{
            $gte:startOfToday
        },
        isActive:true
    }).count()

    //تعداد پرونده های 7 روز گذشته
    const file7DaysCount = await FileModel.find({
        createDate:{
            $gte: sevenDays ,
            $lte: startOfToday
        },
        isActive:true
    }).count()

    //تعداد پرونده های 30 روز گذشته
    const file30DaysCount = await FileModel.find({
        createDate:{
            $gte: thirtyDay,
            $lte: startOfToday
        },
        isActive:true
    }).count()


    //نام پرونده های اخیر
    const lastFileName = await FileModel.find({
        isActive:true
    }).sort({createDate:-1}).select("title createDate").limit(5).lean()

    lastFileName.map(l=>{
        l.createDate = convertToShamsi(l.createDate)
    })


    //تعداد کل پرونده های سامانه
    const totalFileCount = await FileModel.find({
        isActive:true
    }).count()

    //تعداد پرونده های در انتظار تایید
    const totalWaitingForConfirmCount = await FileModel.find({
        isActive:true,
        isConfirm:false,
        isWaiting:true,
        isReject:false
    }).count()


    //تعداد پرونده های رد شده
    const totalFileRejectCount = await FileModel.find({
        isActive:true,
        isConfirm:false,
        isReject:true
    }).count()

    //برای چارت صفحه

    //هفت روز گذشته - تعداد اسناد آپلود شده
    const fileUpload7DaysAgo = []
    const date = new Date();
    date.setDate(date.getDate());
    //moment(date.getDate()-i, 'DD').locale('fa').format('DD')
    for (let i = 0; i < 7; i++) {
        fileUpload7DaysAgo.push({
            label:returnDay(i),
            value:0
        })
    }

    for (let i = 0; i < 7; i++) {
        const today = new Date();
        const limit = new Date(today);
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate()-i);
        limit.setDate(today.getDate()-i+1);

        console.log("*************")
        console.log( new Date())
        console.log( new Date(tomorrow.toLocaleDateString()))
        console.log("*************")

        fileUpload7DaysAgo[i].value = await FileModel.find({
            createDate:{
                $gte: tomorrow.toLocaleDateString(),
                $lt: limit.toLocaleDateString()
            }
        }).count()
    }


    //نوع پرونده ها کلی
    const fileType = []
    for (let i = 0; i < 3; i++) {
        let label
        switch (i){
            case 0:
                label = "مختومه"
                break
            case 1:
                label = "نیمه جاری"
                break
            case 2:
                label = "جاری"
                break
        }
        let value = await FileModel.find({
            fileStatus:label,
            isActive:true
        }).count()
        fileType.push({
            label,
            value
        })
    }




    res.send({
        totalDocuments,
        totalLibrariesDocument,
        totalTodayDocuments,
        last7DayDocuments,
        last30DayDocuments,
        totalSize,
        totalTodaySize,
        total7DaySize,
        total30DaySize,
        makhtomeCount,
        nimeJari,
        jari,
        fileTodayCount,
        file7DaysCount,
        file30DaysCount,
        totalFileCount,
        totalWaitingForConfirmCount,
        totalFileRejectCount,

        fileType,
        fileUpload7DaysAgo,
        lastFileName,
        archives
    })

}
const returnDay = (day)=>{
    switch (day){
        case 0:
            return "امروز"
        case 1:
            return "دیروز"
        case 2:
            return "3 روز قبل"
        case 3:
            return "4 روز قبل"
        case 4:
            return "5 روز قبل"
        case 5:
            return "6 روز قبل"
        case 6:
            return "7 روز قبل"

    }
}

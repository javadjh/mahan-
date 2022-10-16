const {FilterReportingFilesHandler} = require("../../file/query/FilterReportingFilesHandler");
const {errorResponse} = require("../../../utility/ResponseHandler");
const {checkAccessForAllUsersArchive} = require("../../user/query/checkAccessForAllUsersArchive");
const path = require('path')
const XLSX = require('xlsx')
const fs = require('fs')
const {getLogsHandler} = require("./GetLogsHandler");

/*
جهت ارسال فایل اکسل لاگ ها
با فیلتر هایی که کاربر در جستتجو ارسال کرده است
*/
module.exports.getLogsFile = async (req,res)=>{
    //['تاریخچه تغییرات']
    const archiveIds = await checkAccessForAllUsersArchive(["61e3caf7d6d14316ac387bba"],req.user.userId)

    if(archiveIds.length===0)
        return errorResponse(res,6)

    const {logs} = await getLogsHandler(req.query)

    let data = []
    logs.map(log=>{
        data.push({
            "عنوان":log.title,
            "قفسه":log.description,
            "آی پی":log.ip,
            "نوع":log.method==="GET"?"دریافت":log.method==="POST"?"ثبت":log.method==="DELETE"?"حذف":log.method==="PUT"?"بروزرسانی":"غیره",
            "بخش":log.department,
            "ایجاد کننده":log.creator?log.creator.firstName + " " + log.creator.lastName:"-",
            "ایجاد":log.date
        })
    })
    const ws = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()
    if(!wb.Workbook) wb.Workbook = {};
    if(!wb.Workbook.Views) wb.Workbook.Views = [];
    if(!wb.Workbook.Views[0]) wb.Workbook.Views[0] = {};
    wb.Workbook.Views[0].RTL = true;

    const wscols = [
        {wch:30},
        {wch:50},
        {wch:10},
        {wch:10},
        {wch:10},
        {wch:15},
        {wch:15},
    ];

    ws['!cols'] = wscols;

    XLSX.utils.book_append_sheet(wb, ws, 'تاریخچه تغییرات سامانه')
    const fileName = Date.now()+ ".xlsx"
    XLSX.writeFile(wb, path.join(__dirname + "../" + "../" + "../" + "../" + "/uploads/" + fileName))

    await fs.readFile(path.join(__dirname + "../" + "../" + "../" + "../" + "/uploads/" + fileName),(err,file)=>{
        setTimeout(async ()=>{
            return res.sendFile(path.join(__dirname + "../" + "../" + "../" + "../" + "/uploads/" + fileName))
        },1000)
    })

}

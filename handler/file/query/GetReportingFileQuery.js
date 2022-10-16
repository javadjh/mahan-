const {FilterReportingFilesHandler} = require("./FilterReportingFilesHandler");
const {checkAccessForAllUsersArchive} = require("../../user/query/checkAccessForAllUsersArchive");
const {errorResponse} = require("../../../utility/ResponseHandler");

/*
در این ماژول میتوانید گزارش های مربوط به پرونده ها را به کاربر نمایش بدهید

فیلتر ها:
-اشخاص حقیقی
-اشخاص حقوقی
-سمت سازمانی
-ترکیبی

-بازه زمانی
-نزولی یا صعودی
-سورت بر اساس
-دارای پیجینگ

*/
module.exports.getReportingFile = async (req,res)=>{

    //["گزارش گیری"]
    const archiveIds = await checkAccessForAllUsersArchive(["61e3caf7d6d14316ac387bc6"],req.user.userId)
    if(archiveIds.length===0)
        return errorResponse(res,6)

    let {pageId,eachPerPage,legalPeople,people,applicants,startDate,endDate,isDes,sortBy,type,fileStatus} = req.query
    pageId = Number(pageId)
    eachPerPage = Number(eachPerPage)

    //دریافت فیلتر های ماژول
    const {files,total} = await FilterReportingFilesHandler(req.query)

    return res.send({
        pageId,eachPerPage,legalPeople,people,applicants,startDate,endDate,isDes,sortBy,type,fileStatus,
        total,
        files
    })

}

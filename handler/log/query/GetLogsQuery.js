const LogModel = require("../../../model/LogModel");
const {getLogsHandler} = require("./GetLogsHandler");
const {convertToShamsi} = require("../../../utility/dateUtility");
const {checkAccessForAllUsersArchive} = require("../../user/query/checkAccessForAllUsersArchive");
const {roleGuard} = require("../../../authUtilities/Auth");
const {errorResponse} = require("../../../utility/ResponseHandler");

module.exports.getLogs = async (req,res)=>{
    /*await roleGuard(['تاریخچه تغییرات'],req,res)
    if(res.statusCode>399)
        return errorResponse(res,6)*/

    //['تاریخچه تغییرات']
    const archiveIds = await checkAccessForAllUsersArchive(["61e3caf7d6d14316ac387bba"],req.user.userId)

    if(archiveIds.length===0)
        return errorResponse(res,6)


    let {pageId,eachPerPage,method,searchValue,department} = req.query
    pageId = Number(pageId)
    eachPerPage = Number(eachPerPage)

    const {logs,total} = await getLogsHandler(req.query)


    return res.send({
        pageId,
        eachPerPage,
        total,
        searchValue,
        method,
        department,
        logs
    })
}

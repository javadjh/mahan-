const LegalPersonModel = require("../../../model/LegalPerson");
const {checkAccessForAllUsersArchive} = require("../../user/query/checkAccessForAllUsersArchive");
const {insertLog} = require("../../log/command/InsertLogCommand");
const {convertToShamsi} = require("../../../utility/dateUtility");
const {roleGuard} = require("../../../authUtilities/Auth");
const {errorResponse} = require("../../../utility/ResponseHandler");

/*
جهت دریافت اشخاص حقوقی از این ماژول استفاده می شود
دارای paging و سرچ
 */
module.exports.getLegalPeople = async (req,res)=>{
    // roleGuard(['مدیریت اشخاص حقوقی'],req,res)

    //['مدیریت اشخاص حقوقی']
    const archiveIds = await checkAccessForAllUsersArchive(["61ea8a920ac4be3e0c304dac"],req.user.userId)

    if(archiveIds.length===0)
        return errorResponse(res,6)

    let {pageId,eachPerPage,searchValue} = req.query
    pageId = Number(pageId)
    eachPerPage = Number(eachPerPage)

    const legalPeople = await LegalPersonModel.find({
        isActive:true,
        $or:[
            {companyName:{$regex: searchValue, $options: 'i'}},
            {ceo:{$regex: searchValue, $options: 'i'}},
            {address:{$regex: searchValue, $options: 'i'}},
            {registerDate:{$regex: searchValue, $options: 'i'}},
            {registerCode:{$regex: searchValue, $options: 'i'}},
            {tel:{$regex: searchValue, $options: 'i'}}
        ]})
        .populate("creator","firstName lastName")
        .sort({createDate:-1})
        .skip((pageId-1)*eachPerPage)
        .limit(eachPerPage)
        .lean()

    const total = await LegalPersonModel.find({
        isActive:true,
        $or:[
            {companyName:{$regex: searchValue, $options: 'i'}},
            {ceo:{$regex: searchValue, $options: 'i'}},
            {address:{$regex: searchValue, $options: 'i'}},
            {registerDate:{$regex: searchValue, $options: 'i'}},
            {registerCode:{$regex: searchValue, $options: 'i'}},
            {tel:{$regex: searchValue, $options: 'i'}}
        ]})
        .count()

    legalPeople.map(p=>{
        p.createDate = convertToShamsi(p.createDate)
    })

    await insertLog(req,"دریافت لیست شخص حقوقی",`کاربر لیست اشخاص حقوقی را دریافت کرد`,true,"شخص حقوقی")

    return res.send({
        pageId,
        eachPerPage,
        searchValue,
        total,
        legalPeople
    })
}

/*
برای دریافت پرونده ها برای ناظر بایگانی از این ماژول استفاده میشه
1-باید بایگانی رو حتما توی هدر بفرسته
2-پرونده های تایید شده دارای پیجینیشن هست
کلا 3 تا تب هست
یکی که پرونده های تایید شده که پیجیمچ داره
یکی هم پرونده های در انتظار تایید
یکی هم بازگشت داده شده
2 تا آخری پیجینگ نداره

سرچ هم داریم کلا
*/
const FileModel = require("../../../model/FileModel");
const {convertToShamsi} = require("../../../utility/dateUtility");
const {errorResponse} = require("../../../utility/ResponseHandler");
const {roleGuard} = require("../../../authUtilities/Auth");
const UserModel = require("../../../model/UserModel");
const {checkAccessForAllUsersArchive} = require("../../user/query/checkAccessForAllUsersArchive");

module.exports.getSupervisorsFiles = async (req, res)=>{

    let archiveIds = await checkAccessForAllUsersArchive(["623b1c34fc1d1421f0f006b3"],req.user.userId)


    let {pageId,eachPerPage,searchValue,isConfirm,isReject,isWaiting} = req.query
    pageId = Number(pageId)
    eachPerPage = Number(eachPerPage)

    let files = await FileModel.find({
        archiveId: {$in:archiveIds},
        isConfirm,
        isReject,
        isWaiting,
        title:{$regex: searchValue, $options: 'i'},
        isActive:true
    }).populate("creator","firstName lastName userName")
        .skip((pageId-1)*eachPerPage)
        .limit(eachPerPage)
        .populate("archiveTreeId")
        .populate("archiveTreeId.archiveId","isFormRequired")
        .select("-fileDate -fileCodeType -keyword -type -contacts -form -archiveId")
        .lean()

    files.map(f=>{
        f.createDate = convertToShamsi(f.createDate)
    })

    return res.send({
        pageId,
        eachPerPage,
        searchValue,
        isConfirm,
        isReject,
        isWaiting,
        files
    })

}

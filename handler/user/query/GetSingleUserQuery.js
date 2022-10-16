//با استفادهاز ای دی کاربر که از طریق params ارسال می شود کاربر ارسال می شود
const UserModel = require("../../../model/UserModel");
const {checkAccessForAllUsersArchive} = require("./checkAccessForAllUsersArchive");
const {roleGuard} = require("../../../authUtilities/Auth");
const {convertToShamsi} = require("../../../utility/dateUtility");
const {errorResponse} = require("../../../utility/ResponseHandler");
const {isValidObjectId} = require('mongoose')
module.exports.getSingleUser = async (req,res)=>{
    await roleGuard(["تعریف کاربر","کاربران"],req,res)
    if(res.statusCode>399)
        return errorResponse(res,6)

    //["تعریف کاربر","کاربران"]
    const archiveIds = await checkAccessForAllUsersArchive(["61e3caf7d6d14316ac387bb8","61e3caf7d6d14316ac387bb7"],req.user.userId)

    if(archiveIds.length===0)
        return errorResponse(res,6)

    //راستی آزمایی ای دی
    if(!isValidObjectId(req.params.id)) return errorResponse(res,5)

    let user = await UserModel.findById(req.params.id).populate("roleId").select("-password").lean()

    user.createDate = convertToShamsi(user.createDate)

    await insertLog(req,`دریافت کاربر`,`دریافت اطلاعات کاربری ${user.firstName} ${user.lastName}  `,true,"کاربر")

    return res.send(user)

}

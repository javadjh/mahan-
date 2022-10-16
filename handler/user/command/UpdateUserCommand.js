//در این ماژول برای بروزرسانی(ویرایش) یک کاربر استفاده می شود
//نکته: id از طریق params گرفته می شود مابقی در body
const UserModel = require("../../../model/UserModel");
const {checkAccessForAllUsersArchive} = require("../query/checkAccessForAllUsersArchive");
const {insertLog} = require("../../log/command/InsertLogCommand");
const {updateUserValidator} = require("../../../validator/UserValidator");
const {errorResponse} = require("../../../utility/ResponseHandler");
const {insertUserValidator} = require("../../../validator/UserValidator");
const {roleGuard} = require("../../../authUtilities/Auth");
const {isValidObjectId} = require('mongoose')
module.exports.updateUser = async (req, res)=>{
    /*await roleGuard(["کاربران"],req,res)
    if(res.statusCode>399)
        return errorResponse(res,6)
*/
    //کاربران
    const archiveIds = await checkAccessForAllUsersArchive(["61e3caf7d6d14316ac387bb7"],req.user.userId)

    if(archiveIds.length===0)
        return errorResponse(res,6)

    const {error} = updateUserValidator(req.body)
    if(error) return  errorResponse(res,error.message)

    if(!isValidObjectId(req.params.id)) {
        await insertLog(req,` ویرایش کاربر جدید`,`خطا در ثبت کاربر جدید-شناسه ارسال شده اشتباه میباشد`,false,"کاربر")
        return errorResponse(res,5)
    }

    const userUpdated = await UserModel.findByIdAndUpdate(req.params.id,{
        $set:req.body
    })

    if(!userUpdated) {
        await insertLog(req,` ویرایش کاربر جدید`,`خطا در ثبت کاربر جدید`,false,"کاربر")
        return errorResponse(res,4)
    }

    await insertLog(req,` ویرایش کاربر جدید`,`کاربر ${req.body.firstName} ${req.body.lastName} ویرایش شد`,true,"کاربر")

    return res.send(userUpdated)
}

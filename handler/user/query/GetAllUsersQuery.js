// برای دریافت کاربران استفاده میشه باز هم نیاز به paging نداره (فعلا فکر میکنم نیاز نداشته باشه) ولی قابلیت جست و جو دارد
const UserModel = require("../../../model/UserModel");
const {checkAccessForAllUsersArchive} = require("./checkAccessForAllUsersArchive");
const {roleGuard} = require("../../../authUtilities/Auth");
const {insertLog} = require("../../log/command/InsertLogCommand");
const {errorResponse} = require("../../../utility/ResponseHandler");

module.exports.getAllUsers = async (req, res)=>{
    /*await roleGuard(["تعریف کاربر","کاربران","ناظر"],req,res)
    if(res.statusCode>399)
        return errorResponse(res,6)*/

    //["تعریف کاربر","کاربران","ناظر","تاریخچه تغییرات"]
    const archiveIds = await checkAccessForAllUsersArchive(["61e3caf7d6d14316ac387bb8","61e3caf7d6d14316ac387bb7",
        "623b1c34fc1d1421f0f006b3","61e3caf7d6d14316ac387bba"],req.user.userId)

    if(archiveIds.length===0)
        return errorResponse(res,6)


    let {searchValue} = req.query

    //جستجو در نام و نام خانوادگی و نام کاربری و شماره تماس میباشد
    let users = await UserModel.find({
        userName:{
            $ne:"dev"
        },
        isActive:true,
        $or:[
            {firstName:{$regex: searchValue, $options: 'i'}},
            {lastName:{$regex: searchValue, $options: 'i'}},
            {userName:{$regex: searchValue, $options: 'i'}},
            {phoneNumber:{$regex: searchValue, $options: 'i'}},
        ]
    }).populate("roleId").select("-password").sort({createDate:-1})

    await insertLog(req,`ارسال لیست کاربران`,`لیست کاربران با موفقیت ارسال شد`,true,"کاربر")
    res.send(users)
}

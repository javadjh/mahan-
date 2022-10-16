const UserModel = require("../../../model/UserModel");
const {checkAccessForAllUsersArchive} = require("./checkAccessForAllUsersArchive");
const {roleGuard} = require("../../../authUtilities/Auth");
const {errorResponse} = require("../../../utility/ResponseHandler");

/*
برای دریافت لیست کاربران که 2 مقدار label , value رو برمیگردونه برای هر کاربر که برای اتوکامپلیت هست
-برای استفاده در اشتراک گذاری با ایمیل استفاده شده
*/
module.exports.getUsersAutocomplete = async (req,res)=>{
   /* await roleGuard(['اشتراک گذاری اسناد با ایمیل','کاربران',"ناظر"],req,res)
    if(res.statusCode>399)
        return errorResponse(res,6)*/

    //['اشتراک گذاری اسناد با ایمیل','کاربران',"ناظر"]
    const archiveIds = await checkAccessForAllUsersArchive(["6235e88e0b39662ba8edc0ed","61e3caf7d6d14316ac387bb7","623b1c34fc1d1421f0f006b3"],req.user.userId)

    if(archiveIds.length===0)
        return errorResponse(res,6)

    const users = await UserModel.find({
        userName:{
            $ne:"dev"
        },
    }).sort({createDate:-1}).lean()

    let usersAuto = []
    users.map(u=>{
        usersAuto.push({
            value:u._id,
            label:u.firstName +" " + u.lastName
        })
    })

    return res.send(usersAuto)
}

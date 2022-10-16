const UserModel = require("../../../model/UserModel");
const {updateUserProfileValidator} = require("../../../validator/UserValidator");
const {convertToShamsi} = require("../../../utility/dateUtility");
const {errorResponse} = require("../../../utility/ResponseHandler");

/*
جهت ویرایش اطلاعات کاربری از این ماژول استفاده می شود
*/
module.exports.updateProfile = async (req,res)=>{

    const {error} = updateUserProfileValidator(req.body)
    if(error) return errorResponse(res,error.message)

    const user = await UserModel.findByIdAndUpdate(req.user.userId,{
        $set:req.body
    },{new:true}).select("-password -role -isAdmin").lean()

    user.createDate = convertToShamsi(user.createDate)


    return res.send(user)
}

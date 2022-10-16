const UserModel = require("../../../model/UserModel");
const {convertToShamsi} = require("../../../utility/dateUtility");
module.exports.getUsersProfile = async (req,res)=>{

    const user = await UserModel.findById(req.user.userId).select("-password -role -isAdmin").lean()

    user.createDate = convertToShamsi(user.createDate)
    console.log(user.createDate)
    return res.send(user)
}

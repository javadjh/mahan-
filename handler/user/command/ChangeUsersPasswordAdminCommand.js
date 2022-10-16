const {errorResponse} = require("../../../utility/ResponseHandler");
const generator = require("generate-password");
const {genPassword} = require("../../../utility/passwordUtility");
const UserModel = require("../../../model/UserModel");
const {isValidObjectId} = require('mongoose')
module.exports.changeUsersPasswordAdmin = async (req,res)=>{
    const {userId} = req.params
    const id = req.user.userId
    if(id!=="61e3f77540129135ec4d928f" && id!=="626451c2ce31af260c2238be")
        return errorResponse(res,"شما دسترسی ندارید")

    if(!isValidObjectId(userId) || userId.length<8)
        errorResponse(res,5)

    const password = generator.generate({
        length:10,
        numbers:true,
    })
    const passwordEncrypted =await genPassword(password + "@!")

    const user = await UserModel.findByIdAndUpdate(userId,{
        $set:{
            password:passwordEncrypted
        }
    },{new:true})

    if(!user)
        return errorResponse(res,2)

    return res.send({
        password: password + "@!"
    })

}
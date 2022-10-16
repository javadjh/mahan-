const Jwt = require("jsonwebtoken");
module.exports.checkUsersToken = async (req,res)=>{
    const token = req.headers.token
    console.log(token)
    const isTokenValid = await Jwt.verify(token,process.env.JWT_TOKEN)

    return  res.send({
        hasTime : !(Date.now() >= isTokenValid.exp)
    })

}
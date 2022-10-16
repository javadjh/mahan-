const Jwt = require('jsonwebtoken')
const UserModel = require("../model/UserModel");
const RoleModel = require("../model/RoleModel");
const {accessValidator} = require("./CheckAccess");
module.exports.firstGuard = async (req,res,next)=>{
    const token = req.headers.token
    if(!token) return  res.status(401).send({"error":"شما دسترسی به این بخش را ندارید"})
    const isTokenValid = await Jwt.verify(token,process.env.JWT_TOKEN)
    if(!isTokenValid) return  res.status(401).send({"error":"شما دسترسی به این بخش را ندارید"})

    if (Date.now() >= isTokenValid.exp) {
        return  res.status(401).send({"error":"نشست شما منقضی شده است"})
    }

    req.user = isTokenValid
    next()
}

module.exports.roleGuard = async (targets,req,res,targetArchive)=> {
    //let startTime = performance.now()
    const user = await UserModel.findById(req.user.userId).select("role -_id")
    let isFind = false
    let roleId = {}
    let archive
    if(targetArchive) archive = targetArchive
    else archive = req.headers.archive.toString()

    user.role.map(r=>{
        if(r.archiveId.toString()===archive){
            isFind = true;
            roleId = r.roleId
        }
    })
    if(!isFind) return res.status(401)

    const access = await RoleModel.findById(roleId).select("accessList -_id").populate("accessList","title -_id").lean()

    const isRoleValida = accessValidator(targets,access.accessList)

    //let endTime = performance.now()

    //console.log(`Call to doSomething took ${endTime - startTime} milliseconds`)

    if(!isRoleValida)
        return res.status(401)
}

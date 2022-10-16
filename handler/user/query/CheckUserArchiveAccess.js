const UserModel = require("../../../model/UserModel");
module.exports.checkUserArchiveAccess = async (userId,archiveId)=>{
    const user = await UserModel.findById(userId).lean()
    let isFind = false
    user.role.map(r=>{
        if(r.archiveId.toString()===archiveId.toString())
            isFind = true
    })
    return isFind
}

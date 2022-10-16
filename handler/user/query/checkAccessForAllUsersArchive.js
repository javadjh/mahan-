const UserModel = require("../../../model/UserModel");
/*
چک کردن یک دسترسی از بین تمامیه دسترسی های بایگانی هایش
*/
module.exports.checkAccessForAllUsersArchive = async (access,userId)=>{

    const user = await UserModel.findById(userId).populate("role.roleId").select("firstName lastName userName role position").lean()


    let archiveIds = []
    user.role.map(r=>{
        r.roleId.accessList.map(a=>{
            access.map(acc=>{
                if(a.toString()===acc)
                    archiveIds.push(r.archiveId)
            })

        })
    })

    return archiveIds
}

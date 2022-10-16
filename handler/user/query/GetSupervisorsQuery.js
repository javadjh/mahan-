const UserModel = require("../../../model/UserModel");
module.exports.getSupervisors = async (req,res)=>{

    const users = await UserModel.find({
        isActive:true
    }).populate("role.roleId").lean()

    let supervisors = []
    //"623b1c34fc1d1421f0f006b3"
    let isFind = false
    for (let i = 0; i < users.length; i++) {
        isFind = false
        for (let j = 0; j < users[i].role.length; j++) {
            if(isFind){
                break
            }
            for (let k = 0; k < users[i].role[j].roleId.accessList.length; k++) {
                if(isFind)
                    break
                if(users[i].role[j].roleId.accessList[k].toString()==="623b1c34fc1d1421f0f006b3"){
                    isFind = true
                    break
                }
            }
        }
        if(isFind){
            supervisors.push({
                label:`${users[i].firstName} ${users[i].lastName} - ${users[i].position}`,
                value:users[i]._id
            })
        }else{
            isFind = false
        }
    }

    console.log(supervisors)
    return res.send(supervisors)

}
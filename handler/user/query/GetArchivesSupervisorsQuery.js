const {roleGuard} = require("../../../authUtilities/Auth");
const {errorResponse} = require("../../../utility/ResponseHandler");
const UserModel = require("../../../model/UserModel");

/*
دریافت لیست ناظر های یک بایگانی
*/
module.exports.getArchivesSupervisors = async (req,res)=>{

    const users = await UserModel.find({
        userName:{
            $ne:"dev"
        },
        isActive:true,
        role:{
            $elemMatch:{
                archiveId:req.headers.archive
            }
        }
    }).populate("role.roleId").select("firstName lastName userName role position").lean()

    // let supervisor = []
    /*users.map(u=>{
        u.role.map(r=>{
            r.roleId.accessList.map(a=>{
                if(a.toString()==="623b1c34fc1d1421f0f006b3")
                    supervisor.push({
                        _id:u._id,
                        firstName:u.firstName,
                        lastName:u.lastName,
                        userName:u.userName,
                        position:u.position
                    })
            })
        })
    })
    console.log("first")
    console.log(supervisor)*/
    let supervisor = []
    for (let i = 0; i < users.length; i++) {
        let isFind = false
        for (let j = 0; j < users[i].role.length; j++) {
            if(isFind){
                break
            }
            for (let k = 0; k <users[i].role[j].roleId.accessList.length ; k++) {
                if(users[i].role[j].roleId.accessList[k].toString()==="623b1c34fc1d1421f0f006b3"){
                    supervisor.push({
                        _id:users[i]._id,
                        firstName:users[i].firstName,
                        lastName:users[i].lastName,
                        userName:users[i].userName,
                        position:users[i].position
                    })
                    isFind = true
                    break
                }

            }

        }

    }
    console.log("second")
    console.log(supervisor)

    return res.send(supervisor)

}

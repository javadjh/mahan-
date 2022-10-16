const UserModel = require("../../../model/UserModel");
const {errorResponse} = require("../../../utility/ResponseHandler");
const {loginUserValidator} = require("../../../validator/UserValidator");
const bcrypt = require('bcrypt')
const RoleModel = require("../../../model/RoleModel");
const AccessModel = require("../../../model/AccessModel");
const {insertLog} = require("../../log/command/InsertLogCommand");
const {jwtGenerator} = require("../../../utility/jwtGenerator");

//برای لاگین کاربر این ماژول استفاده می شود
module.exports.login = async (req,res)=>{
    const {error} = loginUserValidator(req.body)
    if(error) return errorResponse(res,error.message)

    const {userName,password} = req.body
    const user = await UserModel.findOne({userName}).populate("role.archiveId","title").populate("role.roleId").populate("roleId.accessList")

    if(!user) {
        await insertLog(req,"ورود کاربر جدید",`کاربری با نام کاربری ${userName} تلاش برای ورود کرد اما کاربری با این نام کاربری یافت نشد`,false,'ورود')
        return errorResponse(res, "نام کاربر و یا رمز عبور اشتباه میباشد")
    }

    if(! await bcrypt.compare(password,user.password)) {
        await insertLog(req,"ورود کاربر جدید",`کاربری با نام کاربری ${user.userName} تلاش برای ورود به سامانه کرد اما نام کاربری را اشتباه وارد کرد`,true,'ورود')
        return errorResponse(res,"نام کاربر و یا رمز عبور اشتباه میباشد")
    }

    let accessList = []
    user.role.map(r=>{
        r.roleId.accessList.map(a=>{
            accessList.push(a)
        })
    })


    console.log(accessList)
    const access = await AccessModel.find({
        _id:{
            $in:accessList
        }
    }).select("title -_id")

    let finalAccessList=[]
    access.map(a=>{
        finalAccessList.push(a.title)
    })

    await insertLog(req,"ورود کاربر جدید",`کاربری با نام کاربری ${user.userName} وارد سامانه شد`,true,"ورود")

    const myDate = new Date();
    myDate.setHours( myDate.getHours() + 1 );

    return res.send({
        token:jwtGenerator({
            exp: myDate.getTime(),
            userId:user._id,
            fullName:user.firstName + " " + user.lastName,
            finalAccessList,
        }),
        archive:user.role
    })

}

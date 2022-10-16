/*
در این قسمت مدل کاربران ساخته می شود .
در این قسمت یک اسکیما از نوع role داریم که شامل archive و role میباشد
هر کاربر ممکن هست که به چند بایگانی دسترسی داشته باشه و نقش کاربر در بایگانی های مختلف متفاوت باشد
پس لیستی از role داریم
 */
const mongoose = require('mongoose')
const RoleSchema = new mongoose.Schema({
    archiveId:{
        type:mongoose.Types.ObjectId,
        ref:"archive",
        required:true
    },
    archiveTitle:{
        type:String,
        required:true
    },
    roleTitle:{
        type:String,
        required:true
    },
    roleId:{
        type:mongoose.Types.ObjectId,
        ref:"role",
        required:true
    },
    fileAccess:{
        type:[String],
    }
})
const GuardRoleSchema = new mongoose.Schema({
    archiveId:{
        type:mongoose.Types.ObjectId,
        ref:"archive"
    },
    rule:{
        type:String,
        enum:['primitive','audit','finally'],
    }
})
const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isDeveloper:{
        type:Boolean,
        default:false
    },
    role:{
        type:[RoleSchema],
        required:true
    },
    email:{
        type:String,
        required:true
    },
    createDate:{
        type:Date,
        default:Date.now
    },
    isActive:{
        type:Boolean,
        default:true
    },
    position:{
        type:String,
        required:true
    },
    profileImage:{
        type:String
    },
    guardRole:{
        type:[GuardRoleSchema],
        default:[]
    }
})
const UserModel = mongoose.model("user",UserSchema)
module.exports = UserModel

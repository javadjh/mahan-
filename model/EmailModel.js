/*
برای اشتارک گذاری اسناد یا پرونده از طریق ایمیل مورد استفاده قرار میگیرد
یوزر ها موقت بوده و نام کاربری و رمز توسط سیستم ساخته می شود (یوزر میشه ایمیل طرف - پسوورد جنریت می شود)
*/
const mongoose = require('mongoose')
/*
مربوط به ایمیل میشه
*/
const EmailsUserSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
    },
    //generate by system
    password:{
        type:String,
        required:true
    },
    createDate:{
        type:Date,
        default:Date.now
    }
})
const EmailSchema = new mongoose.Schema({
    documents:{
        type:[mongoose.Types.ObjectId],
        required:true,
        ref:"document"
    },
    usersReceiver:{
        type:[EmailsUserSchema],
        required:true,
    },
    expireDate:{
        type:Date,
        required:true
    },
    fileId:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"file"
    },
    createDate:{
        type:Date,
        default:Date.now
    },
    creator:{
        type:mongoose.Types.ObjectId,
        ref:"user",
        required:true
    }
})
const EmailModel = mongoose.model("email",EmailSchema)
module.exports = EmailModel

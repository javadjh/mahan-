const mongoose = require('mongoose')
const LendSchema = new mongoose.Schema({
    usersReceiver:{
        type:[mongoose.Types.ObjectId],
        required:true,
        ref:"user"
    },
    expireDate:{
        type:Date,
        required:true
    },
    isCompleteFile:{
        type:Boolean,
        required:true
    },
    //اجباری نیست - اگر کل پرونده رو بخاد به اشتراک بگذاره نیازی به این نیست
    documentIds:{
        type:[mongoose.Types.ObjectId],
        ref:"document"
    },
    //در هر صورت اجباری هست- برای مدیریت بهتر
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
        required:true,
        ref:"user"
    }
})
const LendModel = mongoose.model("lend",LendSchema)
module.exports = LendModel

/*
شخص حقوقی با این مدل در سامانه ذخیره میشه و همه آن ها هم اجباری هستن
 */
const mongoose = require('mongoose')
const LegalPersonSchema = new mongoose.Schema({
    companyName:{
        type:String,
        required:true
    },
    ceo:{
        type:String,
        required:true
    },
    address:{
        type:String,
        maxLength:550
    },
    registerDate:{
        type:String,
        maxLength:20
    },
    registerCode:{
        type:String,
        maxLength:20
    },
    tel:{
        type:String,
        maxLength:12
    },
    isActive:{
        type:Boolean,
        default:true
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
const LegalPersonModel = mongoose.model("legalperson",LegalPersonSchema)
module.exports = LegalPersonModel

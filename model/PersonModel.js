/*
شخص حقیقی با این مدل در سامانه ذخیره میشه و همه آن ها هم اجباری هستن
 */
const mongoose = require('mongoose')
const PersonSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    fathersName:{
        type:String,
    },
    idCode:{
        type:String,
    },
    birthday:{
        type:String,
    },
    melliCode:{
        type:String,
        unique:true
    },
    gender:{
        type:String,
        enum:['man','woman'],
        required:true
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
const PersonModel = mongoose.model("person",PersonSchema)
module.exports = PersonModel

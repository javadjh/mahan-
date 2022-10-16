/*
فرم سازی برای روکش سند که کاملا دست کاربر هست که فرم به چه صورت باید ساخته شود
اکثر با ها سمت کلاینت هست داخل بک اند در همین حد هست
هر بایگانی یک فرم داره معمولا
 */
const mongoose = require('mongoose')
const ChildrenSchema = new mongoose.Schema({
    uiId:{
        type:String
    },
    type:{
        type:String,
        enum:['input','checkBox','radio','selector','date','textArea','dateMiladi'],
        required:true
    },
    isRequired:{
       type:Boolean,
    },
    label:{
        type:String,
        required:true
    },
    min:{
        type:Number,
    },
    max:{
        type:Number
    },
    sortNumber:{
        type:Number
    },
    pattern:{
        type:String,
        enum:['melliCode','phoneNumber','email','number','unique']
    },
    values:{
        type:[String],
    },
    answer:{
        type:String
    }
})
const FormSchema = new mongoose.Schema({
    createDate:{
        type:Date,
        default:Date.now
    },
    creator:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"user"
    },
    isActive:{
        type:Boolean,
        default:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    children:{
        type:[ChildrenSchema],
        required:true
    }
})
const FormModel = mongoose.model("form",FormSchema)
module.exports.ChildrenSchema = ChildrenSchema
module.exports = FormModel

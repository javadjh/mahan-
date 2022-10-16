const mongoose = require('mongoose')
const GuardSystemSM = new mongoose.Schema({
    isActive:{
        type:Boolean,
        default:false
    },
    cycle:{
        enum:[1,2,3],
        type:Number,
        default:0
    },
    primitive:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    },
    audit:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    },
    finally:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    }
})
const ArchiveSchema = new mongoose.Schema({
    //عنوان بایگانی
    title:{
        type:String,
        required:true
    },
    //توضیحات بایگانی
    description:{
        type:String,
    },
    //تاریخ ایجاد
    createDate:{
        type:Date,
        default:Date.now
    },
    //سازنده این بایگانی
    creator:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"user"
    },
    //وضعیت بایگانی
    isActive:{
        type:Boolean,

        default:true
    },
    //متن اضافه بر آدرس درخت و کد دیجیتال را کاربر وارد میکند
    watermarkText:{
        type:String,
        default:"این سند اصل نمیباشد"
    },
    //حداکثر حجم آپلودی در قسمت سند
    maxFileSize:{
        type:Number,
        default:2048
    },
    //one:[f]-(user)
    //two:[f]-date(user)
    //three:[f]-date(system)
    //four:(system)
    //five:(user)
    availablePattern:{
        type:String,
        enum:['one','two','three','four','five'],
        default:"three"
    },
    firstStringOfPattern:{
        type:String,
        default:"IT"
    },
    illegalFormats:{
        type:[String],
        default:["dll","ini","bat","msi","exe","info"]
    },
    guardSystem:{
        type:GuardSystemSM,
    }
})
const ArchiveModel = mongoose.model("archive",ArchiveSchema)
module.exports = ArchiveModel

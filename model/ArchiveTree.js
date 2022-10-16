const mongoose = require('mongoose')
const ArchiveTreeSchema = new mongoose.Schema({

    // وقتی روی بایگانی کلیک میکنه که زیر مجموعه هارو ببینه اول اون هایی رو نشون میده که isMain=true باشه
    isMain:{
        type:Boolean,
        default:false
    },
    //بعد از isMain لاشه دوم تا بینهایت با استفاده از این گزینه جلو میره - id parent هست -> مثلا پوشه x ارسال میشه ما تمام زیر زیر شاخه هایی رو میفرستیم که mainParent برابر ای دی x باشه ☺
    mainParent:{
        type:mongoose.Types.ObjectId,
        ref:"archivetree"
    },
    //عنوان زیر شاخه
    title:{
        type:String,
        required:true
    },
    //تاریخ ایجاد
    createDate:{
        type:Date,
        default:Date.now
    },
    //سازنده در این قسمت ثبت می شود
    creator:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    },
    archive:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"archive"
    },
    route:{
        type:String,
        required:true
    },
    //کاربر اجازه دارد به چه زبان هایی پرونده بسازد
    lang:{
        type:String,
        enum:['en','fa','both'],
        default:"fa"
    },
    isActive:{
        type:Boolean,
        default:true
    },
    form:{
        type:mongoose.Types.ObjectId,
        ref:"form"
    },
    isFormRequired:{
        type:Boolean,
        default:false
    }
})
const ArchiveTreeModel = mongoose.model("archivetree",ArchiveTreeSchema)
module.exports = ArchiveTreeModel

const mongoose = require('mongoose')
const {ChildrenSchema} = require("./FormModel");
/*
ساختار مخاطبین
 */

const correspondenceSchema = new mongoose.Schema({
    message:{
        type:String,
        required:true
    },
    isSupervisor:{
        type:Boolean,
        required:true
    },
    creator:{
        type:mongoose.Types.ObjectId,
        ref:"user",
        required:true
    },
    createDate:{
        type:Date,
        default:Date.now
    },
})
const ContactsSchema = new mongoose.Schema({
    label:{
        type:String
    },
    type:{
        type:String,
        enum:['person','legalPerson']
    },
    personId:{
        type:mongoose.Types.ObjectId,
        ref:"person"
    },

    legalPersonId:{
        type:mongoose.Types.ObjectId,
        ref:"legalPerson"
    },
    value:{
        type:String
    }

})
/*
منظور از فایل همان پرونده میباشد و لیست پرونده ها در این قسمت ثبت می شود
*/
const FileSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    //اگر نوع قفسه انگلیسی باشه میلادی هست این تاریخ
    fileDate:{
        type:Date,
        required:true
    },
    createDate:{
        type:Date,
        default:Date.now
    },
    //شماره پرونده در این قسمت درج می شود
    fileCode:{
        type:String,
        required:true,
        unique:true
    },
    // چیزی که کاربر تایپ کرده برای ویرایش نیاز داریم
    fileCodeType:{
        type:String,
    },
    fileStatus:{
        type:String,
        enum:['جاری','نیمه جاری','مختومه'],
        required:true
    },
    //کلید واژه برای جست و جو استفاده می شود
    keyword:{
        type:String
    },
    type:{
        type:String,
        enum:['عادی','محرمانه','به کل محرمانه'],
        required:true
    },
    archiveTreeId:{
        type:mongoose.Types.ObjectId,
        ref:"archivetree",
        required:true
    },
    contacts:{
        type:[ContactsSchema],
    },
    form:{
        type:[ChildrenSchema]
    },
    archiveId:{
        type:mongoose.Types.ObjectId,
        ref:"archive",
        required:true
    },
    isActive:{
        type:Boolean,
        default:true
    },
    isConfirm:{
        type:Boolean,
        default:false
    },
    isWaiting:{
        type:Boolean,
        default:false
    },
    correspondence:{
        type:[correspondenceSchema]
    },
    creator:{
        type:mongoose.Types.ObjectId,
        ref:"user",
        required:true
    },
    isReject:{
        type:Boolean
    },
    supervisorReceiver:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    },
    applicantId:{
        type:mongoose.Types.ObjectId,
        ref:"applicant"
    },
    //اگر کاربر فرم مجزا برای این پرونده انتخاب کند این true میشود
    hasSpecialForm:{
        type:Boolean,
        default:false
    },
    //فرمی که کاربر برای این پرونده انتخاب کرده است
    formSelected:{
        type:mongoose.Types.ObjectId,
        ref:"form"
    },
    //هر فرم بنا به درخواست از قفسه مادر اصلی فرم را میگیرد ، قفسه ای که هیچ mainParent ندارد
    mainArchiveTreeId:{
        type:mongoose.Types.ObjectId,
        ref:"archivetree",
        required:true
    },
    waitingFor:{
        type:String,
        enum:['primitive','audit','finally'],
    },
    message:{
        type:String
    }
})
const FileModel = mongoose.model("file",FileSchema)
module.exports = FileModel

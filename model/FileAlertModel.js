const mongoose = require('mongoose')
const FileAlertSchema = new mongoose.Schema({
    fileId:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"file"
    },
    archiveId:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"archive"
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    alertDate:{
        type:Date,
    },
    isActive:{
        type:Boolean,
        default:true
    },
    creator:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    },
    createDate:{
        type:Date,
        default:Date.now
    },

})
const FileAlertModel = mongoose.model("filealert",FileAlertSchema)
module.exports = FileAlertModel

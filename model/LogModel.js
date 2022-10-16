const mongoose = require('mongoose')
const LogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    creator:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    },
    ip:{
        type:String,
        required:true
    },
    isSuccess:{
        type:Boolean,
        required:true
    },
    method:{
        type:String,
        enum:['GET','POST','DELETE','PUT'],
        required:true
    },
    department:{
        type:String
    },
    fileId:{
        type:mongoose.Types.ObjectId,
        ref:"file"
    },

})
const LogModel = mongoose.model("log",LogSchema)
module.exports = LogModel

/*
هرکاربر دارای یک کازیو میباشد و میتواند یک ریشه پوشه در روت اصلی بسازد که این مدل هر پوشه میباشد
*/
const mongoose = require('mongoose')
const LibraryShelfSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    //اسناد پوشه
    documents:{
        type:[mongoose.Types.ObjectId],
        ref:"document",
        default:[]
    },
    createDate:{
        type:Date,
        default:Date.now
    },
    creator:{
        type:mongoose.Types.ObjectId,
        ref:"user",
        required:true
    },
    isActive:{
        type:Boolean,
        default:true
    }
})
const LibraryShelfModel = mongoose.model("libraryshelf",LibraryShelfSchema)
module.exports = LibraryShelfModel

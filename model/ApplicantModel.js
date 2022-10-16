const mongoose = require('mongoose')
const ApplicantSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    createDate:{
        type:Date,
        default:Date.now
    }
})
const ApplicantModel = mongoose.model("applicant",ApplicantSchema)
module.exports = ApplicantModel

/*
در این قسمت مدل  نقش ها تعریف شده
هر نقش شامل لیستی از دسترسی ها میباشد که ارتباط از نوع embedded میباشد برای سرعت بیشتر
و با استفاده از id ، نفش به کاربر اختصاص داده می شود
*/
const mongoose = require('mongoose')
const RoleSchema = new mongoose.Schema({
    /*
    شامل لیستی از نقش ها که در سامانه سید شده اند میباشد
    ارتباط از نوع embedded
     */
    title:{
        type:String,
        required:true
    },
    accessList:{
        type:[mongoose.Types.ObjectId],
        ref:"access",
        required:true
    },
    description:{
        type:String,
    }
})
const RoleModel = mongoose.model("role",RoleSchema)
module.exports = RoleModel

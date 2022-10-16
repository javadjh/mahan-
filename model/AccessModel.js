//دسترسی های سامانه با این مدل ساخته می شود که توسط خودمان در سامانه وارد می شود و به صورت هارد کد میباشد که مدیریت نمیتواند آن را تغییر دهد .
// فقط برنامه نویس قابلیت تغییر در آن را دارد . در init اولیه به سامانه اضافه می شود
const mongoose = require('mongoose')
const AccessSchema = new mongoose.Schema({
    //عنوان دسترسی در این قسمت نوشته می شود مانند
    //ایجاد پوشه - حدف پوشه و...
    //به صورت فارسی نوشته می شود
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    group:{
        type:String,
        // required:true
    }
})
const AccessModel = mongoose.model("access",AccessSchema)
module.exports.AccessSchema = AccessSchema
module.exports = AccessModel

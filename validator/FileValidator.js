const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
//با آپدیت مشترک هستا
module.exports.insertFileValidator = (data)=>{
    const validator = Joi.object({
        title:Joi.string().required(),
        fileDate:Joi.string().required().min(4),
        fileStatus:Joi.valid('جاری','نیمه جاری','مختومه').required(),
        keyword:Joi.string(),
        type:Joi.valid('عادی','محرمانه','به کل محرمانه').required(),
        archiveTreeId:[Joi.objectId(), Joi.allow(null)],
        contacts:Joi.array(),
        fileCode:Joi.string(),
        fileCodeType:Joi.string(),
        applicantId:Joi.objectId(),
        mainArchiveTreeId:[Joi.objectId(), Joi.allow(null)],
        formSelected:Joi.objectId(),
        hasSpecialForm:Joi.boolean()
        //اگر کاربر فرم جدید برای پرونده در نظر گرفته باشد
    })
    return validator.validate(data)
}

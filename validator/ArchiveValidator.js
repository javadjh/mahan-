const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
//مشترک با آپدیت
module.exports.insertArchiveValidator = (data)=>{
    const validator = Joi.object({
        title:Joi.string().required().min(3).max(255),
        description:[Joi.string().optional(), Joi.allow(null)]

    })
    return validator.validate(data)
}

//ثبت اطلاعات تکمیلی برای بایگانی
module.exports.insertMoreSettingValidator = (data)=>{
    const validator = Joi.object({
        watermarkText:Joi.string().max(100),
        maxFileSize:Joi.number().required(),
        isDigitalCodeGeneratedWithSystem:Joi.boolean().required(),
        availablePattern:Joi.string().required(),
        firstStringOfPattern:Joi.string(),
        illegalFormats:Joi.array()
    })
    return validator.validate(data)
}

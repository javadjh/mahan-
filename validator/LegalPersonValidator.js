const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

//برای استفاده در ماژول ثبت و ویرایش شخص حقوقی جدید
module.exports.insertLegalPersonValidator = (data)=>{
    const validator = Joi.object({
        companyName:Joi.string().required().min(2).max(100),
        ceo:Joi.string().required().min(2).max(80),
        address:[Joi.string().optional(), Joi.allow(null)],
        registerDate:[Joi.string().optional(), Joi.allow(null)],
        registerCode:[Joi.string().optional(), Joi.allow(null)],
        tel:[Joi.string().optional(), Joi.allow(null)]
    })

    return validator.validate(data)
}

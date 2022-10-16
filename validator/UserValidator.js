const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
module.exports.insertUserValidator = (data)=>{
    const validator = Joi.object({
        userName:Joi.string().required().min(10).max(10),
        firstName:Joi.string().required().min(2).max(80),
        lastName:Joi.string().required().min(2).max(80),
        password:Joi.string().min(6).max(32).required(),
        phoneNumber:Joi.string().required().min(11).max(11),
        role:Joi.required(),
        email:Joi.string().required(),
        position:Joi.string().required().min(2).max(100),
    })
    return validator.validate(data)
}

//جهت بروزرسانی کاربر
module.exports.updateUserValidator = (data)=>{
    const validator = Joi.object({
        firstName:Joi.string().required().min(2).max(80),
        lastName:Joi.string().required().min(2).max(80),
        phoneNumber:Joi.string().required().min(11).max(11),
        role:Joi.required(),
        position:Joi.string().required().min(2).max(100),
    })
    return validator.validate(data)
}

//برای ورود کاربر میباشد
module.exports.loginUserValidator = (data)=>{
    const validator = Joi.object({
        password:Joi.string().min(6).max(32).required(),
        userName:Joi.string().required()
    })
    return validator.validate(data)
}
//برای فرگت پسورد هست
module.exports.userForgetPasswordValidator = (data)=>{
    const validator = Joi.object({
        email:Joi.string().email().required(),
        userName:Joi.string().required()
    })
    return validator.validate(data)
}


//بروزرسانی پروفایل کاربر
module.exports.updateUserProfileValidator = (data)=>{
    const validator = Joi.object({
        firstName:Joi.string().required().min(2).max(100),
        lastName:Joi.string().required().min(2).max(100),
        email:Joi.string().required().email(),
        phoneNumber:Joi.string().required().min(11).max(11)
    })
    return validator.validate(data)
}

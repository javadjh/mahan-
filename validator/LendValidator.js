const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

//برای افزودن اشتراک گذاری اسناد یا پرونده استفاده منیشود
module.exports.insertLendValidator = (data)=>{
    const validator = Joi.object({
        usersReceiver:Joi.array().items(Joi.objectId()).required(),
        expireDate:Joi.date().required(),
        isCompleteFile:Joi.boolean(),
        documentIds:Joi.array().items(Joi.objectId()),
        fileId:Joi.objectId().required()
    })
    return validator.validate(data)
}

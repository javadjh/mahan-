const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

//برای افزودن استفاده میشه
module.exports.insertEmailValidator = (data)=>{
    const validator = Joi.object({
        documents:Joi.array(),
        usersReceiver:Joi.array().required(),
        expireDate:Joi.string().required(),
        isGetAll:Joi.boolean(),
        fileId:Joi.objectId().required(),
    })
    return validator.validate(data)
}

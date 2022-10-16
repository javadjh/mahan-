const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

module.exports.insertFileAlertValidator = (data)=>{
    const validator = Joi.object({
        fileId:Joi.objectId().required(),
        archiveId:Joi.objectId().required(),
        title:Joi.string().min(2).max(255).required(),
        description:Joi.string().min(2).max(1000).required(),
        alertDate:Joi.string(),
    })
    return validator.validate(data)
}

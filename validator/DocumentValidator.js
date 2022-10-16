const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

module.exports.insertDocumentFlagValidator = (data)=>{
    const validator = Joi.object({
        description:Joi.string().required().min(1).max(500),
        startSecond:Joi.number().required(),
        endSecond:Joi.number().required(),
        documentId:Joi.objectId().required()
    })
    return validator.validate(data)
}

const Joi = require('joi')
module.exports.insertApplicantValidator = (data)=>{
    const validator = Joi.object({
        title:Joi.string().max(500).required()
    })

    return validator.validate(data)
}

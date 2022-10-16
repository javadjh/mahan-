const Joi = require('joi')
//در insert و update مشترک میباشد
module.exports.insertPersonValidator = (data)=>{
    const validator = Joi.object({
        firstName:Joi.string().min(2).max(80).required(),
        lastName:Joi.string().min(2).max(80).required(),
        fathersName:[Joi.string().optional(), Joi.allow(null)],
        idCode:[Joi.string().optional(), Joi.allow(null)],
        birthday:[Joi.string().optional(), Joi.allow(null)],
        melliCode:[Joi.string().optional(), Joi.allow(null)],
        gender:Joi.string().valid('man','woman').required()
    })
    return validator.validate(data)
}

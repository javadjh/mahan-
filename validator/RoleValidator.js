const Joi = require('joi')
module.exports.insertRoleValidator = (data)=>{
    const validator = Joi.object({
        title:Joi.string().required(),
        accessList:Joi.array(),
        description:Joi.string().min(0).max(100)
    })
    return validator.validate(data)
}

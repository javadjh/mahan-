const Joi = require("joi");
module.exports.updateAppSettingValidator = (data) => {
  const validator = Joi.object({
    mailHost: Joi.string().required().min(5),
    mailPort: Joi.number().required().min(2),
    mailUser: Joi.string().required().min(5),
    mailPassword: Joi.string().required().max(50).min(8),
    mail: Joi.string().required().max(80),
    isSupervisorActive: Joi.boolean().required(),
    illegalFormats: Joi.array(),
  });

  return validator.validate(data);
};

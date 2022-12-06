const Joi = require("joi");
//هم برای insert هست و هم update
module.exports.insertFormValidator = (data) => {
  const validator = Joi.object({
    title: Joi.string().required().min(2).max(80),
    description: [Joi.string().optional(), Joi.allow(null)],
    children: Joi.array().items(
      Joi.object().keys({
        _id: Joi.string(),
        type: Joi.string().required(),
        isRequired: Joi.boolean().required(),
        label: Joi.string()
          .required()
          .error((err) => {
            return new Error("عنوان / برچست اجباری میباشد");
          }),
        min: Joi.number(),
        max: Joi.number(),
        sortNumber: Joi.number(),
        pattern: Joi.string(),
        values: Joi.array(),
        uiId: Joi.string(),
        inputType: Joi.string(),
      })
    ),
  });
  return validator.validate(data);
};

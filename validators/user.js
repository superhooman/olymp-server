const Joi = require("@hapi/joi");

const validateUser = (data) => {

    const schema = Joi.object({
        name: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().min(6).required().email(),
        phone: Joi.string().required(),
        parentPhone: Joi.string().required(),
        school: Joi.string().required(),
        grade: Joi.string().required()
    });

    return schema.validate(data)
}

module.exports = validateUser
const Joi = require("@hapi/joi");

const validateLogin = (data) => {

    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    });

    return schema.validate(data)
}

module.exports = validateLogin
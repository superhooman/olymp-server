const Joi = require("@hapi/joi");

const validateAdmin = (data) => {

    const schema = Joi.object({
        login: Joi.string().min(6).required(),
        password: Joi.string().required(),
        masterPassword: Joi.string().required()
    });

    return schema.validate(data)
}

module.exports = validateAdmin
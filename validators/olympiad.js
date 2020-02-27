const Joi = require("@hapi/joi");

const validateOlympiad = (data) => {

    const schema = Joi.object({
        title: Joi.string().min(6).required(),
        dateStart: Joi.date().required(),
        dateEnd: Joi.date().required(),
        description: Joi.string().required()
    });

    return schema.validate(data)
}

module.exports = validateOlympiad
const joi = require('joi');

//Register validation
const validateRegister = (data) => {

    const schema = joi.object({
        email: joi.string()
            .min(6)
            .required()
            .email(),
        activationCode: joi.string()
            .min(3)
            .required(),
        password: joi.string()
            .min(8)
            .max(120)
            .regex(/[a-zA-Z0-9]+/)
            .required(),
        confirmPasswordValue: joi.any()
            .valid(joi.ref('password'))
            .required()
    });
    return schema.validate(data);
}

//Login validation
const validateLogin = (data) => {

    const schema = joi.object({
        email: joi.string()
            .min(6)
            .required()
            .email(),
        password: joi.string()
            .min(8)
            .required()
    }).unknown(true);
    return schema.validate(data);
}

//Login validation
const validateCheckIn = (data) => {

    const schema = joi.object({
        passphrase: joi.string()
            .required()
    }).unknown(true);
    return schema.validate(data);
}

//Exports both methods
module.exports.validateRegister = validateRegister;
module.exports.validateLogin = validateLogin;
module.exports.validateCheckIn = validateCheckIn;

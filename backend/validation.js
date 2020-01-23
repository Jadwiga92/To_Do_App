const Joi = require('joi');

const register = (data) => {
    const schema = Joi.object({
        email: Joi.string().required().min(6).max(255).email(),
        password: Joi.string().required().min(6).max(1024)
    });
    return schema.validate(data);
};

const login = (data) => {
    const schema = Joi.object({
        email: Joi.string().required().min(6).max(255).email(),
        password: Joi.string().required().min(6).max(1024)
    });
    return schema.validate(data);
};

const task = (data) => {
    const schema = Joi.object({
        description: Joi.string().required().min(1).max(1000),
        status: Joi.string().valid("to_do", "in_progress", "done")

    });
    return schema.validate(data);
};


module.exports.register = register;
module.exports.login = login;
module.exports.task = task;
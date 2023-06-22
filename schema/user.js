const Joi = require('joi')

// 注册表单验证

exports.register_schema = {
    body: {
        username: Joi.string().alphanum().min(1).max(10).required(),
        password: Joi.string().pattern(/^[\S]{6,12}$/).required(),
        email: Joi.string().email().required(),
        code:Joi.required(),
    }
}
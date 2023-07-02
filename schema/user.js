const Joi = require('joi')

// 注册表单验证
exports.register_schema = {
    body: {
        username: Joi.string().alphanum().min(1).max(10).required(),
        password: Joi.string().pattern(/^[\S]{6,12}$/).required(),
        email: Joi.string().email().required(),
        code:Joi.string().min(4).max(6).required(),
    }
}

// 邮箱验证码规则
exports.email_schema ={
    body:{
        email: Joi.string().email().required(),
    }
}

// 登录表单验证
exports.login_schema = {
    body: {
        username: Joi.string().alphanum().min(1).max(10).required(),
        password: Joi.string().pattern(/^[\S]{6,12}$/).required(),
        captcha:Joi.string().min(4).max(6).required()
    }
}
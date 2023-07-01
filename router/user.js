const express = require('express')
// 创建路由对象
const router = express.Router()

// 表单验证
const expressJoi = require('@escook/express-joi')
const { register_schema, code_schema } = require('../schema/user')

const { RegisterHandel, LoginHandel, CodeHandel, loginCodeHandel } = require('../router_handler/user')
// 注册
router.post('/register', expressJoi(register_schema), RegisterHandel)

// 邮箱验证码
router.post('/sendcode', expressJoi(code_schema), CodeHandel)

// 登录
router.post('/login', LoginHandel)

// 登录验证码

router.get('/captcha', loginCodeHandel)

module.exports = router
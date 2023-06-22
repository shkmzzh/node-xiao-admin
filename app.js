const express = require('express')

// 创建 express 的服务器实例
const app = express()

// 配置 cors 跨域
const cors = require('cors')
app.use(cors())

// 配置解析表单数据的中间件
app.use(express.urlencoded({ extended: false }))

// 响应数据的中间件
app.use(function (req, res, next) {
    // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
    res.cc = function (err, status = 1) {
        res.send({
            status,
            message: err instanceof Error ? err.message : err,
        })
    }
    next()
})

// 用户路由模块
const userRouter = require('./router/user')
app.use('/auth', userRouter)

// 错误中间件
const Joi = require('joi')
app.use(function (err, req, res, next) {
    // 数据验证失败
    if (err instanceof Joi.ValidationError) return res.cc(err)
    // 未知错误
    res.cc(err)
})
app.listen(7758, function () {
    console.log('api server running at http://127.0.0.1:7758')
})
const db = require('../db/index')

// 对密码进行加密
const bcrypt = require('bcryptjs')

// 发送邮件插件
const nodemailer = require('nodemailer')

/**
 * @method 获取邮箱验证码处理函数
 */
// 生成随机验证码
function getRandomCode(length) {
  const characters = `0123456789`
  let code = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    code += characters[randomIndex]
  }
  return code
}
const emailStyle = require('../emailStyle')
exports.CodeHandel = (req, res) => {
  const checkEmailSql = `SELECT email FROM sys_user WHERE email = ?`
  db.query(checkEmailSql, req.body.email, (err, result) => {
    if (err) return res.cc(err)
    if (result.length > 0) return res.cc('该邮箱已注册！')
  })
  const code = getRandomCode(6)
  // 发送邮件给用户邮箱
  const transporter = nodemailer.createTransport({
    service: '163',
    auth: {
      user: 'shkmzzh@163.com',
      pass: 'ICSLULMOCURWYCEH'
    }
  })
  const mailOptions = {
    from: 'shkmzzh@163.com', 
    to: req.body.email,
    subject: `XiaoAdmin 验证码:<strong>${code}</strong>`,
    text: emailStyle.emailPageStyle(code)
  }
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err)
      return res.cc('邮箱验证码发送失败！')
    } else {
      console.log('Email sent: ' + info.response)
      const sql = `update ev_code set email_code=?`
      // 存储验证码到数据库或缓存中
      db.query(sql, code, (err, result) => {
        if (err) return res.cc(err)
        if (result.affectedRows !== 1) return res.cc(`验证码失效,请重试`)
        return res.cc('验证码已发送，请注意查收！', 0)
      })
    }
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err)
        return res.cc('邮箱验证码发送失败！')
      } else {
        console.log('Email sent: ' + info.response)
        const sql = `update sys_code set email_code=?`
        db.query(sql, code, (err, result) => {
          if (err) return res.cc(err)
          if (result.affectedRows !== 1) return res.cc(`验证码失效,请重试`)
          return res.cc('验证码已发送，请注意查收！', 0)
        })
      }
    })
  })
}

/**
 * @method 注册接口处理函数
 */

exports.RegisterHandel = (req, res) => {
  // 查询数据库中验证码
  const codesql = `SELECT email_code FROM sys_code`
  db.query(codesql, (err, result) => {
    if (err) return res.cc(err)
    if (result.length !== 1 || result[0].code !== req.body.code) return res.cc('验证码错误，请重新获取！')

    // 验证码一致，进行注册逻辑
    const sql = `select * from sys_user where  username=? or email=?`
    db.query(sql, [req.body.username, req.body.email], (err, result) => {
      if (err) return res.cc(err)
      if (result.length === 2) return res.cc('用户名与邮箱被占用，请更换后重试！')
      if (result.length === 1 && result[0].username === req.body.username) return res.cc('用户名称被占用，请更换后重试！')
      if (result.length === 1 && result[0].email === req.body.email) return res.cc('邮箱已注册，请更换后重试！')

      const sql = `insert into sys_user set ?`
      db.query(sql, { username: req.body.username, password: bcrypt.hashSync(req.body.password, 10), email: req.body.email }, (err, result) => {
        if (err) return res.cc(err)
        if (result.affectedRows !== 1) res.cc('注册用户失败，请稍后再试！')
        res.cc('注册成功！', 0)
      })
    })
  })
}
/**
 * @method 登录接口处理函数
 */
exports.LoginHandel = (req, res) => {
  // 验证验证码
  const sqlVerifyCaptcha = `SELECT captcha FROM sys_code`
  db.query(sqlVerifyCaptcha, (err, result) => {
    if (err) return res.cc(err)
    if (result.length !== 1 || req.body.captcha !== result[0].captcha) {
      return res.cc('验证码错误')
    }

    // 验证用户名和密码
    const sql = `select * from sys_user where username=?`
    db.query(sql, req.body.username, (err, result) => {
      if (err) return res.cc(err)
      if (result.length !== 1) return res.cc('登录失败,用户名不存在!')

      // 将用户和数据库中的密码进行对比 返回布尔值
      const compareResult = bcrypt.compareSync(req.body.password, result[0].password)
      if (!compareResult) return res.cc('登录失败,密码错误！')

      // 生成 JWT 的 Token 字符串
      const jwt = require('jsonwebtoken')
      const config = require('../config')
      // 去除敏感信息及图片
      const user = { ...result[0], password: '', avatar: '' }
      const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: '12h' })
      res.send({
        status: 0,
        message: '登录成功',
        token: 'Bearer ' + tokenStr
      })
    })
  })
}

/**
 * @method 登录验证码
 */
const svgCaptcha = require('svg-captcha')

exports.loginCodeHandel = (req, res) => {
  const options = {
    color: true, // 启用颜色
    background: '#98c7f8', // 设置背景颜色
    size: 4, // 验证码长度
    noise: 3 // 噪点数量
  }

  const captcha = svgCaptcha.create(options)
  console.log(captcha.text)
  const sql = `update sys_code set captcha=?`
  db.query(sql, captcha.text, (err, result) => {
    if (err) return res.cc(err)
    if (result.affectedRows !== 1) return res.cc(`验证码失效,请重试`)
    res.type('svg').send(captcha.data)
  })
}

const db = require('../db/index')

// 对密码进行加密
const bcrypt = require('bcryptjs')

// 发送邮件插件
const nodemailer = require('nodemailer');

/**
 * @method 获取邮箱验证码处理函数
 */
// 生成随机验证码
function getRandomCode(length) {
    const characters = `0123456789`
    let code = ''
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters[randomIndex]
    }
    return code
}
exports.CodeHandel = (req, res) => {
    const checkEmailSql = `SELECT email FROM ev_users WHERE email = ?`;
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
    });
    const mailOptions = {
        from: 'shkmzzh@163.com',
        to: req.body.email,
        subject: '验证码',
        text: `尊敬的用户欢迎使用 xiaoAdmin 后台管理系统，你的注册验证码为：<strong>${code}</strong>`
    };
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
            return res.cc('验证码发送失败！');
        } else {
            console.log('Email sent: ' + info.response);
            const sql = `update ev_code set code=?`
            // 存储验证码到数据库或缓存中
            db.query(sql, code, (err, result) => {
                if (err) return res.cc(err)
                if (result.affectedRows !== 1) return res.cc(`验证码失效,请重试`)
                return res.cc('验证码已发送，请注意查收！', 0)

            })
        }
    });
}

/**
 * @method 注册接口处理函数
 */

exports.RegisterHandel = (req, res) => {
    // 查询数据库中验证码
    const codesql = `SELECT code FROM ev_code`
    db.query(codesql, (err, result) => {
        if (err) return res.cc(err)
        if (result[0].code !== req.body.code) return res.cc('验证码错误，请重新获取！')

        // 验证码一致，进行注册逻辑
        const sql = `select * from ev_users where  username=? or email=?`
        db.query(sql, [req.body.username, req.body.email], (err, result) => {
            if (err) return res.cc(err)
            if (result.length === 2) return res.cc('用户名与邮箱被占用，请更换后重试！')
            if (result.length === 1 && result[0].username === req.body.username) return res.cc('用户名称被占用，请更换后重试！')
            if (result.length === 1 && result[0].email === req.body.email) return res.cc('邮箱已注册，请更换后重试！')

            const sql = `insert into ev_users set ?`
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
    res.send('login OK')
}
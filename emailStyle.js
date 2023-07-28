module.exports = {
    emailPageStyle:(code)=>{
        return `
        <table
        align="center"
        cellpadding="0"
        cellspacing="0"
        class="wrapper"
        style="min-height: 100%; width: 100%; background: linear-gradient(235deg, rgb(249 151 170) 0, #2e89ff 50%, #dfc2c2 100%)"
      >
        <tbody>
          <tr>
            <td>
              <table align="center" cellpadding="0" cellspacing="0" class="wrapper" style="margin: 100px auto; max-width: 800px; background-color: #fff">
                <tbody>
                  <tr>
                    <td style="padding: 70px 100px">
                      <div style="background-color: #fff; min-width: 250px; height: 60px; margin-bottom: 65px; display: flex;">
                        <a href="#" style="cursor: pointer; display: block; width: 72px; height: 70px" target="_blank" title="DMDlink 1" rel="noopener"
                          ><img
                            border="0"
                            height="60"
                            src="https://vue3-xiao-admin.4everland.app/static/png/logo-22eeabbe.png"
                            style="border: 0; outline: 0; text-decoration: none; display: block"
                            width="60"
                        /></a>
                        <p
                          style="
                         
                            color: #999;
                            font: 700 200% Consolas, Monaco, monospace;
                            margin: 10px;
                            text-transform: uppercase;
                          "
                        >
                          XIAOADMIN
                        </p>
                      </div>
      
                      <table border="0" cellpadding="0" cellspacing="0" class="paragraph">
                        <tbody>
                          <tr>
                            <td align="left">
                              <div
                                style="
                                  width: 600px;
                                  font-family: PingFangSC-Medium;
                                  font-size: 24px;
                                  font-weight: 500;
                                  line-height: 32px;
                                  letter-spacing: 0;
                                  color: #1f2126;
                                "
                              >
                                您好，欢迎使用 XIAOADMIN 后台管理系统
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td align="left">
                              <div
                                style="
                                  font-family: PingFangSC-Regular;
                                  font-size: 16px;
                                  font-weight: 400;
                                  line-height: 33px;
                                  letter-spacing: 0;
                                  color: #1f2126;
                                  margin-top: 4px;
                                "
                              >
                                请在打开的浏览器窗口中输入以下验证码：
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td align="left">
                              <div
                                style="
                                  height: 64px;
                                  border-radius: 4px;
                                  background: #f7f7f7;
                                  box-sizing: border-box;
                                  border: 1px solid #e8e8e8;
                                  text-align: center;
                                  line-height: 64px;
                                  margin: 24px 0;
                                  font-size: 32px;
                                  font-weight: 500;
                                  color: #1f2126;
                                  letter-spacing: 10px;
                                "
                              >
                                ${code}
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td align="left">
                              <div style="font-size: 16px; font-weight: 400; line-height: 28px; letter-spacing: 0; color: #1f2126">
                                如非本人操作，请您放心忽略此邮件。
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td align="left">
                              <img
                                border="0"
                                height="36"
                                src="https://vue3-xiao-admin.4everland.app/static/png/logo-22eeabbe.png"
                                style="
                                  border: 0;
                                  margin-top: 60px;
                                  margin-left: auto;
                                  margin-right: auto;
                                  outline: 0;
                                  text-decoration: none;
                                  display: block;
                                "
                                width="36"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td align="center">
                              <a
                                href="#"
                                style="
                                  margin: 8px 0 0 0;
                                  font-size: 12px;
                                  font-weight: 400;
                                  line-height: 24px;
                                  letter-spacing: 0.01em;
                                  color: #2878ff;
                                  text-decoration: none;
                                "
                                target="_blank"
                                title="DMDlink 2"
                                rel="noopener"
                                >shkmzzh.top</a
                              >
                            </td>
                          </tr>
                          <tr>
                            <td align="center">
                              <div style="font-size: 12px; font-weight: 400; line-height: 24px; letter-spacing: 0.01em; color: #767676">
                                🐔 ➕ 🏀 〓 基于Vue3+Vite4+Element-Plus+TypeScript 编写的后台管理系统
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td align="left">
                              <div style="border-bottom: 1px solid #d8d8d8; margin: 24px 0 17px 0">&nbsp;</div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      `
    }
}  
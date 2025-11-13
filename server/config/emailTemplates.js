// config/emailTemplates.js
export const EMAIL_VERIFY_TEMPLATE = `
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <title>Email Verify - EduAdvisor</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" type="text/css">
  <style type="text/css">
    body {
      margin: 0;
      padding: 0;
      font-family: 'Open Sans', sans-serif;
      background: #E5E5E5;
    }

    table, td {
      border-collapse: collapse;
    }

    .container {
      width: 100%;
      max-width: 500px;
      margin: 70px 0px;
      background-color: #ffffff;
      border-radius: 10px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    }

    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 30px;
      text-align: center;
      border-radius: 10px 10px 0 0;
    }

    .main-content {
      padding: 48px 30px 40px;
      color: #000000;
    }

    .button {
      width: 100%;
      background: #667eea;
      text-decoration: none;
      display: inline-block;
      padding: 15px 0;
      color: #fff;
      font-size: 24px;
      text-align: center;
      font-weight: bold;
      border-radius: 7px;
      letter-spacing: 3px;
      font-family: 'Courier New', monospace;
    }

    .feature-list {
      background: #f8f9ff;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
    }

    @media only screen and (max-width: 480px) {
      .container {
        width: 90% !important;
        margin: 20px auto !important;
      }

      .button {
        font-size: 20px !important;
      }
    }
  </style>
</head>

<body>
  <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" bgcolor="#F6FAFB">
    <tbody>
      <tr>
        <td valign="top" align="center">
          <table class="container" width="600" cellspacing="0" cellpadding="0" border="0">
            <tbody>
              <tr>
                <td class="header">
                  <h1 style="color: white; margin: 0; font-size: 28px;">🎓 EduAdvisor</h1>
                  <p style="color: #f0f0f0; margin: 10px 0 0 0; font-size: 16px;">Your Career Journey Starts Here</p>
                </td>
              </tr>
              <tr>
                <td class="main-content">
                                   <table width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tbody>
                      <tr>
                        <td style="padding: 0 0 24px; font-size: 18px; line-height: 150%; font-weight: bold;">
                          Verify your email address 🎯
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 10px; font-size: 14px; line-height: 150%;">
                          Welcome to EduAdvisor! You are just one step away from unlocking personalized career guidance for this email: <span style="color: #667eea; font-weight: bold;">{{email}}</span>.
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 16px; font-size: 14px; line-height: 150%; font-weight: 700;">
                          Use the OTP below to verify your account and start your career journey:
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 24px;">
                          <p class="button">{{otp}}</p>
                        </td>
                      </tr>
                      <tr>
                        <td class="feature-list">
                          <p style="margin: 0 0 15px; font-weight: bold; color: #333;">Once verified, you'll unlock:</p>
                          <ul style="margin: 0; padding-left: 20px; color: #555;">
                            <li style="margin-bottom: 8px;">🤖 AI-powered career assessments</li>
                            <li style="margin-bottom: 8px;">🎯 Personalized career recommendations</li>
                            <li style="margin-bottom: 8px;">🏫 J&K colleges and courses database</li>
                            <li style="margin-bottom: 8px;">📚 Comprehensive study resources</li>
                            <li style="margin-bottom: 8px;">📊 Career analytics and insights</li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 10px; font-size: 14px; line-height: 150%; color: #666;">
                          This OTP is valid for 24 hours. If you didn't create an account with us, please ignore this email.
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 20px 0 0; border-top: 1px solid #eee; font-size: 12px; color: #999; text-align: center;">
                          © 2025 EduAdvisor. Empowering careers in Jammu & Kashmir.<br>
                          This email was sent to {{email}}
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
</body>
</html>
`;

export const PASSWORD_RESET_TEMPLATE = `
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <title>Password Reset - EduAdvisor</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" type="text/css">
  <style type="text/css">
    body {
      margin: 0;
      padding: 0;
      font-family: 'Open Sans', sans-serif;
      background: #E5E5E5;
    }

    table, td {
      border-collapse: collapse;
    }

    .container {
      width: 100%;
      max-width: 500px;
      margin: 70px 0px;
      background-color: #ffffff;
      border-radius: 10px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    }

    .header {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      padding: 30px;
      text-align: center;
      border-radius: 10px 10px 0 0;
    }

    .main-content {
      padding: 48px 30px 40px;
      color: #000000;
    }

    .button {
      width: 100%;
      background: #f5576c;
      text-decoration: none;
      display: inline-block;
      padding: 15px 0;
      color: #fff;
      font-size: 24px;
      text-align: center;
      font-weight: bold;
      border-radius: 7px;
      letter-spacing: 3px;
      font-family: 'Courier New', monospace;
    }

    .security-notice {
      background: #fff3cd;
      border: 1px solid #ffeaa7;
      border-radius: 5px;
      padding: 15px;
      margin: 20px 0;
    }

    @media only screen and (max-width: 480px) {
      .container {
        width: 90% !important;
        margin: 20px auto !important;
      }

      .button {
        font-size: 20px !important;
      }
    }
  </style>
</head>

<body>
  <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" bgcolor="#F6FAFB">
    <tbody>
      <tr>
        <td valign="top" align="center">
          <table class="container" width="600" cellspacing="0" cellpadding="0" border="0">
            <tbody>
              <tr>
                <td class="header">
                  <h1 style="color: white; margin: 0; font-size: 28px;">🔐 Password Reset</h1>
                  <p style="color: #f0f0f0; margin: 10px 0 0 0; font-size: 16px;">EduAdvisor Security</p>
                </td>
              </tr>
              <tr>
                <td class="main-content">
                  <table width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tbody>
                      <tr>
                        <td style="padding: 0 0 24px; font-size: 18px; line-height: 150%; font-weight: bold;">
                          Reset your password 🔑
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 10px; font-size: 14px; line-height: 150%;">
                          We received a password reset request for your EduAdvisor account: <span style="color: #f5576c; font-weight: bold;">{{email}}</span>.
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 16px; font-size: 14px; line-height: 150%; font-weight: 700;">
                          Use the OTP below to reset your password:
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 24px;">
                          <p class="button">{{otp}}</p>
                        </td>
                      </tr>
                      <tr>
                        <td class="security-notice">
                          <p style="margin: 0; color: #856404; font-size: 14px;">
                            <strong>⚠️ Security Notice:</strong> If you didn't request this password reset, please ignore this email and your password will remain unchanged. For your security, this code will expire in 15 minutes.
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 10px; font-size: 14px; line-height: 150%; color: #666;">
                          The password reset OTP is only valid for the next 15 minutes. If you need a new code, you can request another one from the login page.
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 20px 0 0; border-top: 1px solid #eee; font-size: 12px; color: #999; text-align: center;">
                          © 2025 EduAdvisor. Empowering careers in Jammu & Kashmir.<br>
                          This email was sent to {{email}}
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
</body>
</html>
`;

interface IVerifyEmailTemplate {
  username: string,
  url: string,
  company_name?: string,
}

export const verifyEmailTemplate = (
  { username, url, company_name = "Vdohide.com" }: IVerifyEmailTemplate
) => ({
  subject: `Confirm your ${company_name} account`,
  text: `Please verify your email address by clicking the following link: ${url}`,
  html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Confirmation</title>
    <style>
      body { font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 0; } .email-container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); } .header { background: #4caf50; color: #ffffff; text-align: center; padding: 20px; font-size: 24px; } .content { padding: 20px; text-align: center; } .button { display: inline-block; padding: 10px 20px; margin: 20px 0; background: #4caf50; color: #ffffff; text-decoration: none; border-radius: 5px; } .footer { font-size: 12px; color: #888; text-align: center; padding: 10px; }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">Welcome to ${company_name}</div>
      <div class="content">
        <p>Hi ${username},</p>
        <p>
          Thank you for signing up! Please confirm your email address to
          complete your registration.
        </p>
        <a href="${url}" class="button">Confirm Email</a>
      </div>
      <div class="footer">
        If you didn’t create this account, please ignore this email.
      </div>
    </div>
  </body>
</html>
`,
});

interface IPasswordResetTemplate {
  username: string,
  url: string,
}

export const passwordResetTemplate = (
  { username, url, }: IPasswordResetTemplate
) => ({
  subject: `Reset Your Password`,
  text: `To reset your password, please click the following link: ${url}`,
  html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Password Reset</title>
    <style>
      body { font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 0; } .email-container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); } .header { background: #ff5722; color: #ffffff; text-align: center; padding: 20px; font-size: 24px; } .content { padding: 20px; text-align: center; } .button { display: inline-block; padding: 10px 20px; margin: 20px 0; background: #ff5722; color: #ffffff; text-decoration: none; border-radius: 5px; } .footer { font-size: 12px; color: #888; text-align: center; padding: 10px; }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">Reset Your Password</div>
      <div class="content">
        <p>Hi ${username},</p>
        <p>
          We received a request to reset your password. Click the button below
          to proceed:
        </p>
        <a href="${url}" class="button">Reset Password</a>
      </div>
      <div class="footer">
        If you didn’t request this, please ignore this email.
      </div>
    </div>
  </body>
</html>
`,
});

interface IPasswordChangeTemplate {
  username: string,
}
export const passwordChangeTemplate = (
  { username, }: IPasswordChangeTemplate
) => ({
  subject: `Password Change Notification`,
  text: `Password Changed Successfully`,
  html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Password Change Notification</title>
    <style>
     body { font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 0; } .email-container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); } .header { background: #673ab7; color: #ffffff; text-align: center; padding: 20px; font-size: 24px; } .content { padding: 20px; text-align: center; } .footer { font-size: 12px; color: #888; text-align: center; padding: 10px; }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">Password Changed Successfully</div>
      <div class="content">
        <p>Hi ${username},</p>
        <p>
          Your password has been successfully changed. If you didn’t make this
          change, please contact us immediately.
        </p>
      </div>
      <div class="footer">For assistance, contact our support team.</div>
    </div>
  </body>
</html>`,
});


interface ILoginAlertTemplate {
  username: string,
}
export const loginAlertTemplate = (
  { username, }: ILoginAlertTemplate
) => ({
  subject: `Login Alert`,
  text: `Login Notification`,
  html: `<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Login Notification</title>
    <style>
      body { font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 0; } .email-container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); } .header { background: #2196f3; color: #ffffff; text-align: center; padding: 20px; font-size: 24px; } .content { padding: 20px; text-align: center; } .footer { font-size: 12px; color: #888; text-align: center; padding: 10px; }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">Login Alert</div>
      <div class="content">
        <p>Hi ${username},</p>
        <p>We noticed a login to your account from a new device or location:</p>
        <p><strong>Device:</strong> {{device_name}}</p>
        <p>If this wasn’t you, please secure your account immediately.</p>
      </div>
      <div class="footer">For assistance, contact our support team.</div>
    </div>
  </body>
</html>`,
});
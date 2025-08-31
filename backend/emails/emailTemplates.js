// templates/emailTemplates.js

// Welcome Email
export const createWelcomeEmailTemplate = (name, profileUrl) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; padding:20px; border:1px solid #e0e0e0; border-radius:8px;">
      <h2 style="color:#0A66C2;">Welcome to UnLinked, ${name} </h2>
      <p>We’re excited to have you join our professional community.</p>
      <p>Start building your network and exploring opportunities today.</p>
      <a href="${profileUrl}" style="display:inline-block; margin-top:15px; padding:10px 20px; background-color:#0A66C2; color:#fff; text-decoration:none; border-radius:5px;">
        View Your Profile
      </a>
      <p style="margin-top:20px; font-size:12px; color:#888;">This email was sent by UnLinked.</p>
    </div>
  `;
};

// Comment Notification Email
export const createCommentNotificationEmailTemplate = (
  recipientName,
  commenterName,
  postUrl,
  commentContent
) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; padding:20px; border:1px solid #e0e0e0; border-radius:8px;">
      <h3 style="color:#0A66C2;">Hi ${recipientName},</h3>
      <p><strong>${commenterName}</strong> commented on your post:</p>
      <blockquote style="background:#f9f9f9; padding:10px; border-left:4px solid #0A66C2; margin:10px 0;">
        ${commentContent}
      </blockquote>
      <a href="${postUrl}" style="display:inline-block; margin-top:10px; padding:10px 20px; background-color:#0A66C2; color:#fff; text-decoration:none; border-radius:5px;">
        View Comment
      </a>
      <p style="margin-top:20px; font-size:12px; color:#888;">This email was sent by UnLinked.</p>
    </div>
  `;
};

// Connection Accepted Email
export const createConnectionAcceptedEmailTemplate = (
  senderName,
  recipientName,
  profileUrl
) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; padding:20px; border:1px solid #e0e0e0; border-radius:8px;">
      <h3 style="color:#0A66C2;">Good news, ${senderName}! </h3>
      <p><strong>${recipientName}</strong> has accepted your connection request.</p>
      <p>You can now view their profile and start networking.</p>
      <a href="${profileUrl}" style="display:inline-block; margin-top:15px; padding:10px 20px; background-color:#0A66C2; color:#fff; text-decoration:none; border-radius:5px;">
        View Profile
      </a>
      <p style="margin-top:20px; font-size:12px; color:#888;">This email was sent by UnLinked.</p>
    </div>
  `;
};

export const createOTPVerificationEmailTemplate = (name, otp) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Email Verification</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: #0077b5;
          color: white;
          padding: 20px;
          text-align: center;
          border-radius: 8px 8px 0 0;
        }
        .content {
          background-color: #f9f9f9;
          padding: 30px;
          border-radius: 0 0 8px 8px;
        }
        .otp-box {
          background-color: #0077b5;
          color: white;
          padding: 15px;
          text-align: center;
          border-radius: 8px;
          font-size: 24px;
          font-weight: bold;
          margin: 20px 0;
          letter-spacing: 5px;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
          color: #666;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>LinkedIn Clone</h1>
        <h2>Email Verification</h2>
      </div>
      <div class="content">
        <p>Hello ${name},</p>
        <p>Thank you for registering with LinkedIn Clone! To complete your registration, please use the following verification code:</p>
        
        <div class="otp-box">
          ${otp}
        </div>
        
        <p>This code will expire in 10 minutes for security reasons.</p>
        <p>If you didn't create an account with us, please ignore this email.</p>
        
        <p>Best regards,<br>The LinkedIn Clone Team</p>
      </div>
      <div class="footer">
        <p>This is an automated email. Please do not reply to this message.</p>
      </div>
    </body>
    </html>
  `;
};

export const createPasswordResetEmailTemplate = (name, otp) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Password Reset</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: #0077b5;
          color: white;
          padding: 20px;
          text-align: center;
          border-radius: 8px 8px 0 0;
        }
        .content {
          background-color: #f9f9f9;
          padding: 30px;
          border-radius: 0 0 8px 8px;
        }
        .otp-box {
          background-color: #0077b5;
          color: white;
          padding: 15px;
          text-align: center;
          border-radius: 8px;
          font-size: 24px;
          font-weight: bold;
          margin: 20px 0;
          letter-spacing: 5px;
        }
        .warning {
          background-color: #fff3cd;
          border: 1px solid #ffeaa7;
          color: #856404;
          padding: 15px;
          border-radius: 8px;
          margin: 20px 0;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
          color: #666;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>LinkedIn Clone</h1>
        <h2>Password Reset</h2>
      </div>
      <div class="content">
        <p>Hello ${name},</p>
        <p>We received a request to reset your password. Use the following verification code to complete the password reset process:</p>
        
        <div class="otp-box">
          ${otp}
        </div>
        
        <div class="warning">
          <strong>Important:</strong> This code will expire in 10 minutes for security reasons. If you didn't request a password reset, please ignore this email and your password will remain unchanged.
        </div>
        
        <p>If you have any questions or concerns, please contact our support team.</p>
        
        <p>Best regards,<br>The LinkedIn Clone Team</p>
      </div>
      <div class="footer">
        <p>This is an automated email. Please do not reply to this message.</p>
      </div>
    </body>
    </html>
  `;
};

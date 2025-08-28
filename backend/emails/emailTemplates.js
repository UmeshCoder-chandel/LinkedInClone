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

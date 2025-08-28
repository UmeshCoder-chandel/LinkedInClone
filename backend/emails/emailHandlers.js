import { transporter, sender } from "../config/nodemail.js";
import {
  createCommentNotificationEmailTemplate,
  createConnectionAcceptedEmailTemplate,
  createWelcomeEmailTemplate,
} from "./emailTemplates.js";

export const sendWelcomeEmail = async (email, name, profileUrl) => {
  try {
    const info = await transporter.sendMail({
      from: sender,
      to: email,
      subject: "Welcome to LinkedIn Clone",
      html: createWelcomeEmailTemplate(name, profileUrl),
    });
    console.log("Welcome email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw error;
  }
};

export const sendCommentNotificationEmail = async (
  recipientEmail,
  recipientName,
  commenterName,
  postUrl,
  commentContent
) => {
  try {
    const info = await transporter.sendMail({
      from: sender,
      to: recipientEmail,
      subject: "New comment on your post",
      html: createCommentNotificationEmailTemplate(
        recipientName,
        commenterName,
        postUrl,
        commentContent
      ),
    });
    console.log("Comment notification sent:", info.messageId);
  } catch (error) {
    console.error("Error sending comment notification:", error);
    throw error;
  }
};

export const sendConnectionAcceptedEmail = async (
  senderName,
  senderEmail,
  recipientName,
  profileUrl
) => {
  try {
    const info = await transporter.sendMail({
      from: sender,
      to: senderEmail,
      subject: `${recipientName} accepted your connection request`,
      html: createConnectionAcceptedEmailTemplate(
        senderName,
        recipientName,
        profileUrl
      ),
    });
    console.log("Connection accepted email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending connection accepted email:", error);
    throw error;
  }
};

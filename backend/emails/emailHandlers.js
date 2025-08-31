import { transporter, sender } from "../config/nodemail.js";
import {
  createCommentNotificationEmailTemplate,
  createConnectionAcceptedEmailTemplate,
  createWelcomeEmailTemplate,
  createOTPVerificationEmailTemplate,
  createPasswordResetEmailTemplate,
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

export const sendOTPVerificationEmail = async (email, name, otp) => {
  try {
    const info = await transporter.sendMail({
      from: sender,
      to: email,
      subject: "Email Verification - LinkedIn Clone",
      html: createOTPVerificationEmailTemplate(name, otp),
    });
    console.log("OTP verification email sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending OTP verification email:", error);
    throw error;
  }
};

export const sendPasswordResetEmail = async (email, name, otp) => {
  try {
    const info = await transporter.sendMail({
      from: sender,
      to: email,
      subject: "Password Reset - LinkedIn Clone",
      html: createPasswordResetEmailTemplate(name, otp),
    });
    console.log("Password reset email sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw error;
  }
};

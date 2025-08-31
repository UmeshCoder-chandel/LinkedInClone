import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GOOGLE_EMAIL_NAME,
    pass: process.env.GOOGLE_APP_KEY,
  },
});

export const sender = process.env.GOOGLE_EMAIL_NAME;

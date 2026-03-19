import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true, // Use true for port 465, false for port 587
  auth: {
    user: process.env.EMAIL,
    // app password for above email, not the original email password
    pass: process.env.PASSWORD,
  },
});

export const senfOtpMail = async (to, otp) => {
  await transporter.sendMail({
    from: process.env.EMAIL,
    to,
    subject: "Password reset OTP for Vingo",
    text: `Your OTP for password reset is ${otp}. It is valid for 10 minutes. If you did not request for password reset, please ignore this email.`,
  });
};

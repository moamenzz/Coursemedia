import nodemailer from "nodemailer";
import {
  APPLICATION_NAME,
  NODEMAILER_APP_PASSWORD,
  SENDER_DOMAIN,
} from "../constants/getENV";

interface SendEmailParams {
  subject: string;
  html: string;
  to: string;
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: SENDER_DOMAIN,
    pass: NODEMAILER_APP_PASSWORD,
  },
});

const sendEmail = async ({ subject, html, to }: SendEmailParams) => {
  await transporter.sendMail({
    from: `${APPLICATION_NAME} <${SENDER_DOMAIN}>`,
    to,
    subject,
    html,
  });
};

export default sendEmail;

import resend from "../config/resend";
import { NODE_ENV, SENDER_DOMAIN } from "../constants/getENV";

interface ResendParams {
  to: string;
  text: string;
  subject: string;
  html: string;
}

const getFrom = () =>
  NODE_ENV === "development" ? "onboarding@resend.dev" : SENDER_DOMAIN;

const getTo = (to: string) =>
  NODE_ENV === "development" ? "a5tsasyalcomputer@gmail.com" : to;

const sendEmail = async ({ to, text, subject, html }: ResendParams) =>
  await resend.emails.send({
    from: getFrom(),
    to: getTo(to),
    subject,
    html,
    text,
  });

export default sendEmail;

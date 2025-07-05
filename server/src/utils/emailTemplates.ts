import { APPLICATION_NAME } from "../constants/getENV";

interface EmailTemplateParams {
  subject: string;
  header: string;
  link: string;
  expiry_date: string;
  email: string;
}

export const EMAIL_TEMPLATE = ({
  subject,
  header,
  link,
  expiry_date,
  email,
}: EmailTemplateParams) => ({
  subject,
  text: `${header}\n${link}\nThis link will expire in ${expiry_date}.`,
  html: `
<div style="font-family: system-ui, sans-serif, Arial; font-size: 14px; color: #333; padding: 20px 14px; background-color: #f5f5f5;">
  <div style="max-width: 600px; margin: auto; background-color: #fff;">
    <div style="text-align: center; background-color: #333; padding: 14px;">
      <a style="text-decoration: none; outline: none;" href="${link}" target="_blank" rel="noopener">&nbsp;</a>
    </div>
    <div style="padding: 14px;">
      <h1 style="font-size: 22px; margin-bottom: 26px;">${subject}</h1>
      <p>${header}</p>
      <p><a href="${link}">Click here</a></p>
      <p>This link will expire in ${expiry_date}.</p>
      <p>If you didn't make this request, please ignore this email or let us know immediately. Your account remains secure.</p>
      <p>Best regards,<br>The ${APPLICATION_NAME} Team</p>
    </div>
  </div>
  <div style="max-width: 600px; margin: auto;">
    <p style="color: #999;">The email was sent to ${email}<br>You received this email because you are registered with ${APPLICATION_NAME}</p>
  </div>
</div>
`,
});

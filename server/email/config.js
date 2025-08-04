import nodemailer from "nodemailer";
import path from "path";
import {APP_INFO, COMPANY_INFO } from "../../app/_mock/index.js";
// Create a transporter with your email service configuration.
export const transporter = nodemailer.createTransport({
  // host: "mail.movingsurface.com.ng",
  // port: 465,
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: {
    // pass: "Movingsurface001!",
    // user: "victor@movingsurface.com.ng",
    pass: process.env.SMTP_PASSWORD,
    user: process.env.SMTP_USER_EMAIL,
  },
});


export async function sendPhotobooth({email, fullName, filePath}) {

//   const resolvedFilePath = process.cwd() + "/public/" + filePath;
  const resolvedFilePath = path.resolve(process.cwd() + "/public/" + filePath);
  console.log("Resolved file path: ", resolvedFilePath);
  
//   const emailHtml = await render(PhotoboothMail({ email, fullName, website }));
  // Define the email options including the attachment.
  const mailOptions = {
    from: `"${COMPANY_INFO.name}" <${process.env.SMTP_USER_EMAIL}>`,
    // from: process.env.SMTP_USER_EMAIL,
    to: `${email}`, // List of recipients
    bcc: [COMPANY_INFO.contact.email], // BCC to admin
    subject: `${APP_INFO.name} `,
    text: `Hello ${fullName},\nPlease find the attached document.\n\nBest Regards,\n${COMPANY_INFO.name}`,
    html: `Hello ${fullName},\nPlease find the attached document.\n\nBest Regards,\n${COMPANY_INFO.name}`,
    // html: `Hello ${fullName},\nPlease find the attached PDF document.\n\nBest Regards,\nMoving Surface`,
    // html: emailHtml,
    attachments: [
      {
        filename: `${fullName}.png`,
        path: resolvedFilePath,
        contentType: "image/png",
      },
    ],
  };

  const info = await transporter.sendMail(mailOptions);
  return info.response;
}
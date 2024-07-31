import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_EMAIL_USER,
    pass: process.env.GMAIL_EMAIL_PASSWORD,
  },
});

export async function sendEmail({
  html,
  subject,
  to,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  const info = await transporter.sendMail({
    from: `"Nuxt Lucia Auth" <${process.env.GMAIL_EMAIL_USER}>`, // sender address
    to, // list of receivers
    subject, // Subject line
    // text: "Hello world?", // plain text body
    html, // html body
  });
}

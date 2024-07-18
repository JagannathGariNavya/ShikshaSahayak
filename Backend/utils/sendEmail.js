import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jnavyan12@gmail.com',
    pass: 'oxgz kxnz sxld gcwx'
  }
});

async function sendEmail(to, subject, text, html) {
  try {
    const info = await transporter.sendMail({
      from: '"Navya 👻" <jnavyan12@gmail.com>',
      to: to,
      subject: subject,
      text: text,
      html: html,
    });
    return `Message sent: ${info.messageId}`;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

export default sendEmail;
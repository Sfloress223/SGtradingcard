import 'dotenv/config';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function run() {
  console.log('User:', process.env.EMAIL_USER);
  console.log('Sending...');
  try {
    const res = await transporter.sendMail({
      from: `"S&G Test" <${process.env.EMAIL_USER}>`,
      to: 'sgtradingcard@gmail.com',
      subject: 'Test Boot',
      html: '<b>Hello!</b>'
    });
    console.log('Success:', res.messageId);
  } catch (err) {
    console.error('Failure:', err);
  }
}

run();

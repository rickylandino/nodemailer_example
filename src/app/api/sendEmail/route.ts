import { type NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export async function POST(request: NextRequest) {
  const { to_email } = await request.json();

  const port:string = process.env.SMTP_PORT || '';

  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(port),
    secure: false,
    tls: {
        ciphers: "SSLv3",
        rejectUnauthorized: false,
    },
    auth: {
      user: process.env.SMTP_FROM,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions: Mail.Options = {
    from: `${process.env.SMTP_FROM}`,
    to: to_email,
    subject: `Sample Subject`,
    text: "Email sent with nodemailer",
    replyTo: to_email
  };

  const sendMailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transport.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve('Email sent');
        } else {
          reject(err.message);
        }
      });
    });

  try {
    var response:string = await sendMailPromise();
    return NextResponse.json({ response, status: 200 });
  } catch (err) {
    return NextResponse.json({ response: 'Error', status: 500});
  }
}
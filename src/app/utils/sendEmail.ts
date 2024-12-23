import nodemailer from 'nodemailer'


export const sendEmail = async (email: string, resetLink: string) => {


  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth: {
      user: 'amdaulhaque15@gmail.com',
      pass: 'bkbk qgye seha yszr',
    },
  });

  await transporter.sendMail({
    from: 'amdaulhaque15@gmail.com', // sender address
    to: email, // list of receivers
    subject: 'Reset Password', // Subject line
    html: resetLink, // html body
  });
};
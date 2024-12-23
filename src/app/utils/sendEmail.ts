import nodemailer from 'nodemailer'
import config from '../config';

export const sendEmail = async() =>{
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
         to: 'rimonamdadul301@gmail.com', // list of receivers
         subject: 'Password Change', // Subject line
         text: 'Hello world? Password Bhule geso', // plain text body
         html: '<b>Hello world?</b>', // html body
       });
}
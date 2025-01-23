import config from "../config";
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: config.nodemailer_host_email,
    pass: config.nodemailer_host_pass,
  },
});


const supportEmailWithNodemailer = async (emailData: any) => {
  try {
    const mailOptions = {
      from: emailData.email, // sender address
      to: 'raseldev847@gmail.com', // list of receivers
      subject: emailData.subject, // Subject line
      html: emailData.html, // html body
    };
    const info = await transporter.sendMail(mailOptions);
    console.log('---> Email sent %s', info.response);
  } catch (error) {
    console.error('Error sending mail', error);
    throw error;
  }
};


export default supportEmailWithNodemailer

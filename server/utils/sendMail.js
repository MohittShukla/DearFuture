const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables

// Create reusable transporter with Gmail SMTP settings
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Use Gmail's SMTP host
  port: 587, // Gmail SMTP port (TLS)
  secure: false, // Use TLS (not SSL)
  auth: {
    user: process.env.SMTP_USER,  
    pass: process.env.SMTP_PASSWORD,  
  },
});

const sendMail = async (to, subject, text, html) => {
  try {
    console.log('Email configuration:', {
      host: 'smtp.gmail.com', // Gmail SMTP host
      port: 587, // Gmail SMTP port (TLS)
      user: process.env.SMTP_USER,
      sender: process.env.VERIFIED_SENDER,
    });

    console.log('Attempting to send email:', { to, subject });

    // Setting up mail options
    const mailOptions = {
      from: `"DearFuture" <${process.env.VERIFIED_SENDER}>`, // Use your verified sender's email here
      to,
      subject,
      text: text || 'Please enable HTML to view this email',
      html: html || '',
    };

    console.log('Mail options:', mailOptions);

    // Sending the email
    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result);
    return { data: result, error: null };
  } catch (error) {
    console.error('Detailed error sending email:', error);
    if (error.response) {
      console.error('SMTP Response:', error.response);
    }
    return { data: null, error };
  }
};

module.exports = sendMail;

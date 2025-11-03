const nodemailer = require('nodemailer');
require('dotenv').config();

// Verify transporter configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  // Add connection verification
  pool: true,
  maxConnections: 1,
  rateDelta: 1000,
  rateLimit: 5,
});

// Verify connection configuration
transporter.verify()
  .then(() => console.log('SMTP Connection verified successfully'))
  .catch(err => console.error('SMTP Connection verification failed:', err));

const sendMail = async (to, subject, text, html) => {
  try {
    console.log('Sending email with configuration:', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER,
      from: process.env.VERIFIED_SENDER,
      to,
      subject
    });

    if (!to || !subject) {
      throw new Error('Missing required email parameters');
    }

    const mailOptions = {
      from: `"DearFuture" <${process.env.VERIFIED_SENDER}>`,
      to,
      subject,
      text: text || 'Please enable HTML to view this email',
      html: html || '',
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'High',
        'Importance': 'high'
      }
    };

    console.log('Attempting to send email with options:', {
      to: mailOptions.to,
      subject: mailOptions.subject,
      from: mailOptions.from
    });

    const result = await transporter.sendMail(mailOptions);
    
    console.log('Email sent successfully:', {
      messageId: result.messageId,
      response: result.response,
      accepted: result.accepted,
      rejected: result.rejected
    });

    return { success: true, data: result, error: null };

  } catch (error) {
    console.error('Detailed email sending error:', {
      error: error.message,
      code: error.code,
      command: error.command,
      response: error.response,
      responseCode: error.responseCode,
      stack: error.stack
    });

    return { 
      success: false,
      data: null, 
      error: {
        message: error.message,
        code: error.code,
        response: error.response
      }
    };
  }
};

module.exports = sendMail;

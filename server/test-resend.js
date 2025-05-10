require('dotenv').config();
const sendMail = require('./utils/sendMail');

async function testResend() {
  console.log('Testing Resend configuration...');
  console.log('API Key:', process.env.RESEND_API_KEY ? '(set)' : '(missing)');
  
  try {
    const result = await sendMail(
      'kilzldyc@gmail.com',
      'Test Email from DearFuture',
      'Testing email delivery with Resend',
      `
      <!DOCTYPE html>
      <html>
      <body>
        <h2>DearFuture Test Email</h2>
        <p>This is a test email sent via Resend.</p>
        <p>If you receive this, the email configuration is working correctly!</p>
      </body>
      </html>
      `
    );
    
    if (result.error) {
      console.error('Failed to send email:', result.error);
    } else {
      console.log('Email sent successfully!');
      console.log('Result:', result.data);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

testResend();

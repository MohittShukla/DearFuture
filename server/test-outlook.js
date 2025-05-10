const path = require('path');
require('dotenv').config();
const sendMail = require('./utils/sendMail');

async function testOutlookEmail() {
  console.log('Testing Outlook email configuration...');
  console.log('Email User:', process.env.EMAIL_USER);
  console.log('App Password:', process.env.EMAIL_PASSWORD ? 'is set' : 'is missing');
  
  try {
    const result = await sendMail(
      'kilzldyc@gmail.com',
      'Test Email from DearFuture via Outlook',
      'Testing Outlook email configuration with app password',
      `
      <!DOCTYPE html>
      <html>
      <body>
        <h2>DearFuture Test Email</h2>
        <p>This is a test email sent via Outlook SMTP using app password.</p>
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

testOutlookEmail();

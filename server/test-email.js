const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const sendMail = require('./utils/sendMail');

async function testEmail() {
  console.log('Environment variables:');
  console.log('EMAIL_USER:', process.env.EMAIL_USER);
  console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? '(password is set)' : '(password is missing)');
  
  try {
    const result = await sendMail(
      'kilzldyc@gmail.com',
      'Test Email from DearFuture',
      'This is a test email to verify the configuration.',
      `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          .gradient-box {
            background: linear-gradient(135deg, #EBF8FF 0%, #BEE3F8 100%);
            border-radius: 12px;
            padding: 25px;
            margin: 20px 0;
          }
          .header-icon {
            font-size: 48px;
            margin-bottom: 20px;
          }
          .quote-text {
            font-style: italic;
            color: #4299e1;
            margin: 20px 0;
            text-align: center;
            font-size: 16px;
          }
        </style>
      </head>
      <body style="margin: 0; padding: 20px; background-color: #f7fafc; font-family: Arial, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <tr>
            <td style="padding: 40px 30px;">
              <!-- Header -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding-bottom: 30px;">
                    <div class="header-icon">✨</div>
                    <h2 style="color: #2b6cb0; font-size: 28px; margin: 0; font-weight: 300;">Test Email from DearFuture</h2>
                  </td>
                </tr>
              </table>

              <!-- Content -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div class="gradient-box">
                      <p style="text-align: center; margin: 0; font-size: 16px; color: #2d3748; line-height: 1.6;">
                        If you're seeing this email, the configuration is working correctly! You can now send messages to the future.
                      </p>
                    </div>
                    <p class="quote-text">"The best way to predict the future is to create it."</p>
                  </td>
                </tr>
              </table>

              <!-- Footer -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 30px; border-top: 2px solid #edf2f7;">
                <tr>
                  <td align="center" style="padding-top: 30px;">
                    <p style="color: #718096; margin: 0;">Sent with ❤️ from DearFuture</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
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

testEmail();

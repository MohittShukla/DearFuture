require('dotenv').config();
const sendMail = require('./utils/sendMail');

async function testEmailFunctionality() {
    console.log('Starting email test...');
    console.log('Using configuration:', {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        user: process.env.SMTP_USER,
        sender: process.env.VERIFIED_SENDER
    });

    try {
        const result = await sendMail(
            process.env.SMTP_USER, // sending to same email for testing
            'DearFuture Email Test',
            'This is a test email to verify the email functionality is working.',
            `
            <html>
                <body style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2 style="color: #3b82f6;">DearFuture Email Test</h2>
                    <p>This is a test email sent at: ${new Date().toLocaleString()}</p>
                    <p>If you received this email, the email functionality is working correctly!</p>
                </body>
            </html>
            `
        );

        if (result.success) {
            console.log('✅ Email test successful!');
            console.log('Email Details:', {
                messageId: result.data.messageId,
                accepted: result.data.accepted,
                response: result.data.response
            });
        } else {
            console.error('❌ Email test failed:', result.error);
        }
    } catch (error) {
        console.error('❌ Test failed with error:', error);
        console.error('Error details:', {
            message: error.message,
            code: error.code,
            command: error.command
        });
    }
}

testEmailFunctionality();
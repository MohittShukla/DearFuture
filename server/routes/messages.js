const express = require('express');
const Message = require('../models/Message');
const sendMail = require('../utils/sendMail');

// HTML template for scheduling confirmation
const formatSchedulingConfirmationHTML = (deliveryDate) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
</head>
<body style="margin: 0; padding: 20px; background-color: #f7fafc; font-family: Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    <tr>
      <td style="padding: 40px 30px;">
        <!-- Header -->
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center" style="padding-bottom: 30px;">
              <div style="font-size: 36px; margin-bottom: 20px;">✨</div>
              <h2 style="color: #2b6cb0; font-size: 24px; margin: 0;">Message Successfully Scheduled!</h2>
            </td>
          </tr>
        </table>

        <!-- Content -->
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="background-color: #f8fafc; padding: 25px; border-radius: 8px;">
              <p style="text-align: center; margin: 0 0 20px 0;">Your message has been safely stored and scheduled for delivery.</p>
              
              <div style="text-align: center; background-color: #ebf8ff; color: #2b6cb0; padding: 12px; border-radius: 8px; margin: 20px 0;">
                <strong>Delivery Date:</strong><br>
                ${new Date(deliveryDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>

              <div style="background-color: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <p style="margin: 0;">Your words have been carefully preserved and will be delivered to your future self at the perfect moment. What a wonderful surprise it will be!</p>
              </div>

              <!-- Next Steps -->
              <div style="background-color: #ebf8ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #2b6cb0; margin: 0 0 15px 0;">What's Next?</h3>
                <ul style="margin: 0; padding-left: 20px; color: #4a5568;">
                  <li style="margin-bottom: 8px;">Add dearfuture.com to your safe senders list</li>
                  <li style="margin-bottom: 8px;">Mark your calendar for the delivery date</li>
                  <li style="margin-bottom: 8px;">Consider writing more messages to different points in your future</li>
                </ul>
              </div>

              <p style="text-align: center; color: #4299e1; font-style: italic; margin: 20px 0;">"The best way to predict the future is to create it."</p>
            </td>
          </tr>
        </table>

        <!-- Footer -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 30px;">
          <tr>
            <td align="center">
              <p style="color: #718096; margin: 0 0 5px 0;">Thank you for using DearFuture</p>
              <p style="color: #718096; margin: 0;">Every moment becomes a memory worth preserving</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

const messagesRouter = express.Router();

// GET: Retrieve all messages
messagesRouter.get('/', async (req, res) => {
  try {
    console.log('GET /api/messages route hit');
    const messages = await Message.find();
    console.log('Messages retrieved:', messages);
    res.json({ success: true, data: messages });
  } catch (err) {
    console.error('Error retrieving messages:', err);
    res.status(500).json({ success: false, message: 'Error retrieving messages' });
  }
});

// POST: Save a new message
messagesRouter.post('/', async (req, res) => {
  try {
    console.log('\n[POST /api/messages]');
    console.log('Request body:', JSON.stringify(req.body, null, 2));
    const { message, email, deliverDate } = req.body;

    console.log('Creating new message with data:', {
      message: message.substring(0, 50) + '...',
      email,
      deliverDate
    });

    const newMessage = new Message({
      message,
      email,
      deliveryDate: new Date(deliverDate),
      createdAt: new Date()
    });

    await newMessage.save();
    console.log('Message saved to database:', JSON.stringify(newMessage, null, 2));

    // Send HTML confirmation email with extra logging
    try {
      console.log('\n[Sending confirmation email]');
      console.log('Recipient:', email);
      console.log('Delivery date:', new Date(deliverDate).toLocaleDateString());
      
      const emailResult = await sendMail(
        email,
        'Message Scheduled - DearFuture',
        'Your message has been scheduled and will be delivered on ' + new Date(deliverDate).toLocaleDateString(),
        formatSchedulingConfirmationHTML(deliverDate)
      );

      if (emailResult.error) {
        console.error('[Email Error]:', emailResult.error);
      } else {
        console.log('[Email Success] Result:', JSON.stringify(emailResult.data, null, 2));
        console.log('From:', emailResult.data.envelope.from);
        console.log('To:', emailResult.data.envelope.to);
      }
    } catch (emailError) {
      console.error('[Email Error] Details:', emailError);
      if (emailError.response) {
        console.error('[SMTP Response]:', emailError.response);
      }
    }

    res.status(201).json({
      success: true,
      message: 'Message saved successfully',
      data: newMessage
    });
  } catch (err) {
    console.error('[Error] POST /api/messages:', err);
    console.error('[Stack]:', err.stack);
    res.status(500).json({
      success: false,
      message: 'Error saving message',
      error: err.message
    });
  }
});

module.exports = messagesRouter;

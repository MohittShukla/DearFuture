const cron = require('cron');
const sendMail = require('../utils/sendMail');
const Message = require('../models/Message');

// Function to normalize date to YYYY-MM-DD format in local timezone
const normalizeDate = (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

// Format the message content with HTML
const formatMessageHTML = (message, scheduledDate) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    .message-quote {
      font-style: italic;
      color: #4a5568;
      padding-left: 12px;
      border-left: 3px solid #4299e1;
      margin: 15px 0;
    }
    .time-badge {
      display: inline-block;
      background-color: #ebf8ff;
      color: #2b6cb0;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 14px;
      margin-top: 15px;
    }
    .header-icon {
      font-size: 36px;
      margin-bottom: 15px;
    }
    .gradient-box {
      background: linear-gradient(135deg, #EBF8FF 0%, #BEE3F8 100%);
      border-radius: 12px;
      padding: 25px;
      margin: 20px 0;
    }
    .button {
      display: inline-block;
      background: linear-gradient(135deg, #4299E1 0%, #3182CE 100%);
      color: white;
      padding: 12px 25px;
      border-radius: 25px;
      text-decoration: none;
      font-weight: 500;
      margin-top: 20px;
      box-shadow: 0 4px 6px rgba(66, 153, 225, 0.2);
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
            <td align="center" style="padding-bottom: 30px; border-bottom: 2px solid #edf2f7;">
              <div class="header-icon">✉️</div>
              <h2 style="color: #2b6cb0; font-size: 28px; margin: 0; font-weight: 300;">A Message from Your Past Self</h2>
              <p style="color: #718096; margin: 10px 0 0 0; font-size: 16px;">A letter through time, delivered today</p>
            </td>
          </tr>
        </table>

        <!-- Message Content -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 30px;">
          <tr>
            <td>
              <div class="gradient-box">
                ${message.split('\n').map(line => `<p style="margin: 0 0 15px 0; line-height: 1.8; color: #2d3748; font-size: 16px;">${line}</p>`).join('')}
              </div>
              <div class="time-badge">
                Written on ${new Date(scheduledDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </td>
          </tr>
        </table>

        <!-- Footer -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 30px; border-top: 2px solid #edf2f7;">
          <tr>
            <td align="center" style="padding-top: 30px;">
              <p class="quote-text">"The past is but a dream, and the future merely a vision."</p>
              <p style="color: #4299e1; font-style: italic; margin: 0 0 10px 0;">Delivered with care by DearFuture</p>
              <p style="color: #718096; margin: 0 0 20px 0;">Want to send another message to your future self?</p>
              <a href="https://dearfuture.com" class="button">Write a New Letter</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

// Format confirmation email with HTML
const formatConfirmationHTML = (deliveryDate) => `
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
    .date-badge {
      text-align: center;
      background-color: white;
      color: #2b6cb0;
      padding: 15px;
      border-radius: 8px;
      margin: 20px 0;
      border: 1px solid #bee3f8;
    }
    .steps-box {
      background-color: #ebf8ff;
      padding: 20px;
      border-radius: 12px;
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
              <h2 style="color: #2b6cb0; font-size: 28px; margin: 0; font-weight: 300;">Message Successfully Scheduled!</h2>
            </td>
          </tr>
        </table>

        <!-- Content -->
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td>
              <div class="gradient-box">
                <p style="text-align: center; margin: 0; font-size: 16px; color: #2d3748; line-height: 1.6;">
                  Your message has been carefully preserved and will be delivered at the perfect moment. 
                  What a wonderful surprise it will be!
                </p>
                
                <div class="date-badge">
                  <strong style="display: block; margin-bottom: 8px; color: #2b6cb0;">Delivery Date</strong>
                  <span style="font-size: 18px; color: #4a5568;">
                    ${new Date(deliveryDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>

              <!-- Next Steps -->
              <div class="steps-box">
                <h3 style="color: #2b6cb0; margin: 0 0 15px 0; font-size: 18px;">What's Next?</h3>
                <ul style="margin: 0; padding-left: 20px; color: #4a5568;">
                  <li style="margin-bottom: 12px;">Add dearfuture.com to your safe senders list</li>
                  <li style="margin-bottom: 12px;">Mark your calendar for the delivery date</li>
                  <li style="margin-bottom: 12px;">Consider writing more messages to different points in your future</li>
                </ul>
              </div>

              <p class="quote-text">"The best way to predict the future is to create it."</p>
            </td>
          </tr>
        </table>

        <!-- Footer -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 30px; border-top: 2px solid #edf2f7;">
          <tr>
            <td align="center" style="padding-top: 30px;">
              <p style="color: #718096; margin: 0 0 5px 0;">Thank you for using DearFuture</p>
              <p style="color: #718096; margin: 0;">Every moment becomes a memory worth preserving</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

// Function to check and send due messages
const checkAndSendMessages = async () => {
  try {
    const today = new Date();
    console.log(`[Scheduler] Checking messages at ${today.toLocaleString()}`);
    
    // Find all messages
    const messagesToSend = await Message.find({});
    console.log(`[Scheduler] All messages in database:`, messagesToSend);
    
    const todayStr = normalizeDate(today);
    console.log(`[Scheduler] Looking for messages due on ${todayStr}`);
    
    const dueMessages = messagesToSend.filter(msg => {
      const msgDate = normalizeDate(msg.deliveryDate);
      console.log(`[Scheduler] Message ${msg._id}: comparing date ${msgDate} with today ${todayStr}`);
      return msgDate === todayStr;
    });
    
    console.log(`[Scheduler] Found ${dueMessages.length} messages due for delivery`);

    for (const messageObj of dueMessages) {
      try {
        const { email, message, deliveryDate } = messageObj;
        console.log(`[Scheduler] Processing message for ${email}`);

        // Send the actual message
        await sendMail(
          email,
          'Your Message from the Past - DearFuture',
          message,
          formatMessageHTML(message, messageObj.createdAt)
        );

        console.log(`[Scheduler] Successfully sent message to ${email}`);

        // Wait 1 second before sending confirmation
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Send delivery confirmation
        await sendMail(
          email,
          'Message Delivered Successfully - DearFuture',
          null,
          formatConfirmationHTML(deliveryDate)
        );

        console.log(`[Scheduler] Sent delivery confirmation to ${email}`);

        // Delete the message after successful sending
        await Message.deleteOne({ _id: messageObj._id });
        console.log(`[Scheduler] Deleted message ${messageObj._id}`);

      } catch (error) {
        console.error(`[Scheduler] Error processing message for ${messageObj.email}:`, error);
      }
    }
  } catch (error) {
    console.error('[Scheduler] Error in scheduler:', error);
  }
};

// Run check immediately when server starts
console.log('[Scheduler] Running immediate check for messages...');
checkAndSendMessages();

// Then set up regular midnight check
const job = new cron.CronJob('0 0 * * *', checkAndSendMessages);

console.log('[Scheduler] Starting scheduler for daily midnight checks...');
job.start();

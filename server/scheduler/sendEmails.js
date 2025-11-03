const cron = require('cron');
const sendMail = require('../utils/sendMail');
const Message = require('../models/Message');

// Normalize date to YYYY-MM-DD format in local timezone
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
              <p style="color: #4299e1; font-style: italic; margin: 0 0 10px 0;">Delivered with care by DearFuture ✨</p>
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

// Enhanced message processing with retries
const processMessage = async (messageObj, retryCount = 0) => {
  const maxRetries = 3;
  const retryDelay = 5000; // 5 seconds

  try {
    const { email, message, deliveryDate } = messageObj;
    console.log(`Processing message ${messageObj._id} for ${email}`);

    // Send the actual message
    const result = await sendMail(
      email,
      'Your Message from the Past - DearFuture',
      message,
      formatMessageHTML(message, messageObj.createdAt)
    );

    if (!result.success) {
      throw new Error(result.error.message);
    }

    console.log(`Successfully sent message to ${email}`);
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Send delivery confirmation
    const confirmationResult = await sendMail(
      email,
      'Message Delivered Successfully - DearFuture',
      null,
      formatConfirmationHTML(deliveryDate)
    );

    if (!confirmationResult.success) {
      throw new Error('Confirmation email failed: ' + confirmationResult.error.message);
    }

    console.log(`Sent delivery confirmation to ${email}`);
    
    // Only delete if both emails were sent successfully
    await Message.deleteOne({ _id: messageObj._id });
    console.log(`Successfully processed and deleted message ${messageObj._id}`);

  } catch (error) {
    console.error(`Error processing message ${messageObj._id}:`, error);

    if (retryCount < maxRetries) {
      console.log(`Retrying message ${messageObj._id} (Attempt ${retryCount + 1}/${maxRetries})`);
      await new Promise(resolve => setTimeout(resolve, retryDelay));
      return processMessage(messageObj, retryCount + 1);
    } else {
      console.error(`Failed to process message ${messageObj._id} after ${maxRetries} attempts`);
      // Could implement a failed messages queue here
    }
  }
};

// Enhanced checkAndSendMessages function
const checkAndSendMessages = async () => {
  const lockKey = 'emailSchedulerLock';
  try {
    console.log(`[Scheduler] Starting check at ${new Date().toISOString()}`);
    
    const messagesToSend = await Message.find({});
    console.log(`[Scheduler] Found ${messagesToSend.length} total messages`);
    
    const todayStr = normalizeDate(new Date());
    const dueMessages = messagesToSend.filter(msg => 
      normalizeDate(msg.deliveryDate) === todayStr
    );
    
    console.log(`[Scheduler] Processing ${dueMessages.length} messages due for delivery`);

    // Process messages concurrently but with rate limiting
    const concurrencyLimit = 3;
    for (let i = 0; i < dueMessages.length; i += concurrencyLimit) {
      const batch = dueMessages.slice(i, i + concurrencyLimit);
      await Promise.all(batch.map(msg => processMessage(msg)));
      
      // Add delay between batches to prevent rate limiting
      if (i + concurrencyLimit < dueMessages.length) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

  } catch (error) {
    console.error('[Scheduler] Error in scheduler:', error);
  }
};

// Run check immediately when server starts
console.log('[Scheduler] Initializing email scheduler...');
checkAndSendMessages();

// Set up regular midnight check (server timezone)
const job = new cron.CronJob('0 0 * * *', checkAndSendMessages, null, true, 'UTC');
console.log('[Scheduler] Scheduled for daily midnight (UTC) checks');

// Also check every 6 hours as a backup
const backupJob = new cron.CronJob('0 */6 * * *', checkAndSendMessages, null, true, 'UTC');
console.log('[Scheduler] Backup scheduler running every 6 hours');

module.exports = { checkAndSendMessages, processMessage };

# DearFuture - Setup Instructions

This guide will help you set up all the new features including authentication, message history, and the external cron service for Render's free tier.

## Table of Contents
1. [Environment Variables](#environment-variables)
2. [Setting Up External Cron Service](#setting-up-external-cron-service)
3. [Testing the Application](#testing-the-application)
4. [Features Overview](#features-overview)

---

## Environment Variables

### Required Environment Variables

Create a `.env` file in the `server/` directory with the following variables:

```bash
# MongoDB Connection
MONGO_URI=your_mongodb_connection_string

# Environment
NODE_ENV=development

# Client URL (for production)
CLIENT_URL=https://dearfuture.onrender.com

# SMTP Configuration
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_smtp_username
SMTP_PASSWORD=your_smtp_password
VERIFIED_SENDER=your_verified_sender_email@example.com

# JWT Secret (for authentication)
# Generate: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_SECRET=your_jwt_secret_key_here

# Cron Secret (for external cron service security)
# Generate: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
CRON_SECRET=your_cron_secret_key_here

# Server Port (optional)
PORT=3000
```

### Generating Secrets

To generate secure random secrets for JWT_SECRET and CRON_SECRET:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## Setting Up External Cron Service

### The Problem
Render's free tier puts your app to sleep after 15 minutes of inactivity. This means scheduled messages won't be delivered on time.

### The Solution
Use an external cron service to ping your application regularly, keeping it alive and triggering the email scheduler.

### Recommended Services

#### Option 1: Cron-Job.org (Recommended)
1. Go to [cron-job.org](https://cron-job.org)
2. Create a free account
3. Click "Create Cronjob"
4. Configure the job:
   - **Title**: DearFuture Email Scheduler
   - **URL**: `https://dearfuture.onrender.com/api/cron/send-emails?secret=YOUR_CRON_SECRET`
   - **Schedule**: Daily at 00:00 UTC (midnight)
   - **Request Method**: POST
   - **Optional**: Add header `X-Cron-Secret: YOUR_CRON_SECRET`

5. Save the cronjob

#### Option 2: EasyCron
1. Go to [easycron.com](https://www.easycron.com)
2. Create a free account
3. Create a new cron job:
   - **URL**: `https://dearfuture.onrender.com/api/cron/send-emails?secret=YOUR_CRON_SECRET`
   - **Cron Expression**: `0 0 * * *` (daily at midnight)
   - **HTTP Method**: POST

#### Option 3: UptimeRobot (Keep-Alive Only)
UptimeRobot can keep your app alive but won't trigger the email scheduler:
1. Go to [uptimerobot.com](https://uptimerobot.com)
2. Create a free account
3. Add New Monitor:
   - **Monitor Type**: HTTP(s)
   - **Friendly Name**: DearFuture KeepAlive
   - **URL**: `https://dearfuture.onrender.com/api/health`
   - **Monitoring Interval**: 5 minutes

**Note**: If using UptimeRobot for keep-alive, you still need a cron service to trigger the email scheduler.

### Testing the Cron Endpoint

You can manually trigger the email scheduler to test it:

```bash
# Without authentication
curl -X POST https://dearfuture.onrender.com/api/cron/send-emails

# With CRON_SECRET (recommended)
curl -X POST https://dearfuture.onrender.com/api/cron/send-emails?secret=YOUR_CRON_SECRET

# Or with header
curl -X POST https://dearfuture.onrender.com/api/cron/send-emails \
  -H "X-Cron-Secret: YOUR_CRON_SECRET"
```

---

## Testing the Application

### 1. Test Authentication

#### Sign Up
1. Navigate to `/signup`
2. Create a new account with:
   - Name
   - Email
   - Password (minimum 6 characters)
3. You should be redirected to the dashboard

#### Login
1. Navigate to `/login`
2. Enter your credentials
3. You should be redirected to the dashboard

### 2. Test Message Creation

#### As Authenticated User
1. Log in to your account
2. Navigate to the home page (`/`)
3. The email field will be pre-filled with your account email (read-only)
4. Write a message and select a future delivery date
5. Submit the form
6. Check your email for the scheduling confirmation

#### As Guest User
1. Navigate to the home page without logging in
2. All fields will be editable
3. Enter your message, email, and delivery date
4. Submit the form
5. Check your email for the scheduling confirmation

### 3. Test Message History

1. Log in to your account
2. Click "My Messages" in the header or navigate to `/dashboard`
3. You should see all your scheduled and delivered messages
4. Use the filter tabs to view:
   - All Messages
   - Upcoming (not yet delivered)
   - Delivered (already sent)

### 4. Test Health Check

```bash
curl https://dearfuture.onrender.com/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-01-15T12:00:00.000Z",
  "uptime": 123.456
}
```

---

## Features Overview

### 1. User Authentication
- **Sign Up**: Create a new account with name, email, and password
- **Login**: Access your account
- **Logout**: Sign out from your account
- **Protected Routes**: Dashboard is only accessible to logged-in users
- **Session Management**: JWT-based authentication with 30-day expiration

### 2. Message History Dashboard
- **View All Messages**: See all your scheduled and delivered messages
- **Filter by Status**:
  - All Messages
  - Upcoming (pending delivery)
  - Delivered (already sent)
- **Message Details**:
  - Message content
  - Scheduled/delivery date
  - Days until delivery (for upcoming messages)
  - Creation date

### 3. Smart Form Behavior
- **Authenticated Users**: Email field is pre-filled and read-only
- **Guest Users**: All fields are editable
- **Date Selection**: Quick buttons for common intervals (+1 Month, +6 Months, +1 Year, +5 Years)

### 4. Email Notifications
- **Scheduling Confirmation**: Sent immediately after creating a message
- **Message Delivery**: Sent on the scheduled date
- **Delivery Confirmation**: Sent after successful delivery

### 5. Render Free Tier Solution
- **Health Check Endpoint**: Keep the app alive
- **External Cron Trigger**: Reliable message delivery even when app is sleeping
- **Secure Trigger**: Protected with CRON_SECRET
- **Manual Trigger**: Can be triggered manually for testing

### 6. Message Persistence
- Messages are **not deleted** after delivery
- Marked as "delivered" with timestamp
- Accessible in message history forever
- Linked to user accounts

---

## Deployment Checklist

### Before Deploying to Render:

1. **Set Environment Variables** in Render Dashboard:
   - MONGO_URI
   - NODE_ENV=production
   - CLIENT_URL
   - SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, VERIFIED_SENDER
   - JWT_SECRET
   - CRON_SECRET

2. **Set Up External Cron Service**:
   - Choose a cron service (cron-job.org recommended)
   - Create a job to POST to `/api/cron/send-emails`
   - Include CRON_SECRET in request
   - Schedule for daily execution at midnight UTC

3. **Optional: Set Up UptimeRobot**:
   - Monitor `/api/health` endpoint
   - Check every 5-15 minutes
   - Keeps app alive between cron triggers

4. **Test Deployment**:
   - Test authentication (signup/login)
   - Test message creation
   - Test message history
   - Manually trigger cron endpoint
   - Verify emails are sent

---

## Troubleshooting

### Messages Not Being Delivered

1. **Check if app is sleeping**:
   - Visit `/api/health` to wake it up
   - Check Render logs

2. **Verify cron service is working**:
   - Check cron service dashboard for execution logs
   - Manually trigger: `curl -X POST https://your-app.onrender.com/api/cron/send-emails?secret=YOUR_SECRET`

3. **Check email logs**:
   - Review server logs for email sending errors
   - Verify SMTP credentials are correct

### Authentication Issues

1. **JWT_SECRET not set**:
   - Generate a new secret: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
   - Add to environment variables

2. **Token expired**:
   - Log out and log back in
   - Tokens expire after 30 days

### Email Not Received

1. **Check spam folder**
2. **Verify VERIFIED_SENDER is correct**
3. **Check SMTP credentials**
4. **Review server logs for errors**

---

## Support

If you encounter any issues:
1. Check the server logs in Render dashboard
2. Review the troubleshooting section
3. Ensure all environment variables are set correctly
4. Test endpoints manually using curl

---

## Summary

Your DearFuture app now includes:
- User authentication system
- Message history dashboard
- External cron service support for Render free tier
- Smart form behavior for authenticated users
- Comprehensive email notifications
- Message persistence (no deletion after delivery)

All features work together to provide a reliable time capsule messaging service even on Render's free tier!

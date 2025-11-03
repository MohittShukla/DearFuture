# DearFuture - Deployment Checklist for Render

## ✅ Pre-Deployment Checklist

### 1. **Environment Variables on Render**
You MUST add these to your Render environment variables **before** deployment:

```bash
# MongoDB Atlas (already have this, but verify it's the Atlas URI, not localhost)
MONGO_URI=mongodb+srv://MyAppUser:Sybxi2-qiswab-rarxyb@dearfuture.gjyn2az.mongodb.net/dearfuture?retryWrites=true&w=majority&appName=DearFuture

# Node Environment
NODE_ENV=production

# Client URL
CLIENT_URL=https://dearfuture.onrender.com

# SMTP Configuration (already have these)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=mohittshukla1@gmail.com
SMTP_PASSWORD=eptfvlaxbmuvqvpl
VERIFIED_SENDER=mohittshukla1@gmail.com

# **NEW** - JWT Secret (REQUIRED FOR AUTH)
JWT_SECRET=086b8614e27fc669f4e84b00943a09f3ad4a2334f3f4a849c9f733adfc5d118f

# **NEW** - Cron Secret (REQUIRED FOR EXTERNAL CRON)
CRON_SECRET=97a8be5806e49e53fa96d5fa514022a661e880bf3f102a550207295cacb3d645

# Server Port (optional, Render sets this automatically)
PORT=3000
```

### 2. **Commit and Push to GitHub**

The changes are already staged. Now commit and push:

```bash
# Commit the changes
git commit -m "feat: Complete UI/UX redesign with authentication

- Added landing page with smooth animations
- Implemented user authentication (login/signup)
- Created message history dashboard
- Added unified dark theme design system
- Protected routes for authenticated users
- Updated all pages to cohesive design
- Added external cron support for Render free tier"

# Push to GitHub
git push origin main
```

### 3. **Render Will Auto-Deploy**

Once you push, Render will automatically:
1. Detect the changes
2. Run the build: `cd client && npm install && npm run build && cd ../server && npm install`
3. Start the server: `cd server && node server.js`
4. Your app will be live!

---

## 🔧 Post-Deployment Steps

### 1. **Set Up External Cron Service** (IMPORTANT for message delivery)

Since Render free tier sleeps after inactivity, you need an external service to keep it alive:

#### Option A: Cron-Job.org (Recommended)
1. Go to [cron-job.org](https://cron-job.org)
2. Create free account
3. Create new cron job:
   - **Title**: DearFuture Scheduler
   - **URL**: `https://dearfuture.onrender.com/api/cron/send-emails?secret=97a8be5806e49e53fa96d5fa514022a661e880bf3f102a550207295cacb3d645`
   - **Schedule**: Daily at 00:00 UTC
   - **HTTP Method**: POST
4. Save

#### Option B: EasyCron
1. Go to [easycron.com](https://www.easycron.com)
2. Create free account
3. Create cron job with same settings as above

#### Option C: UptimeRobot (Keep-Alive Only)
1. Go to [uptimerobot.com](https://uptimerobot.com)
2. Add monitor:
   - **Type**: HTTP(s)
   - **URL**: `https://dearfuture.onrender.com/api/health`
   - **Interval**: Every 5 minutes

**Note**: You'll still need Option A or B for actual email scheduling.

### 2. **Verify Deployment**

Test these endpoints:

```bash
# Health check
curl https://dearfuture.onrender.com/api/health

# Test signup (replace with real data)
curl -X POST https://dearfuture.onrender.com/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"test123"}'

# Test login
curl -X POST https://dearfuture.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

### 3. **Test the Full User Flow**

1. Visit https://dearfuture.onrender.com
2. Click "Get Started" → Sign up
3. Login with your credentials
4. Create a test message (set delivery date to today or tomorrow)
5. Check your email for confirmation
6. Visit "My Messages" to see your message history
7. Logout and verify landing page shows correctly

---

## 🚨 Common Issues & Solutions

### Issue: "Cannot find module 'bcryptjs'"
**Solution**: The dependencies are in package.json. Render should install them automatically. If not, check build logs.

### Issue: Authentication not working
**Solution**: Make sure `JWT_SECRET` is set in Render environment variables.

### Issue: Messages not being delivered
**Solution**:
1. Check if external cron service is configured
2. Verify `CRON_SECRET` matches in both .env and cron URL
3. Check Render logs for scheduler errors

### Issue: Landing page shows blank
**Solution**:
1. Clear browser cache
2. Check build logs for any CSS/JS errors
3. Verify all new files were pushed to GitHub

### Issue: "CORS error" in browser console
**Solution**: Check that `CLIENT_URL` in Render matches your actual deployed URL

---

## 📊 Monitoring

### Check Logs on Render
1. Go to Render Dashboard
2. Select your service
3. Click "Logs" to see real-time logs
4. Look for:
   - `Connected to MongoDB` ✅
   - `Server running on port 3000` ✅
   - `SMTP Connection verified` ✅
   - `[Scheduler] Initializing email scheduler` ✅

### Test Endpoints

```bash
# Test health
curl https://dearfuture.onrender.com/api/health

# Trigger email check manually (use your CRON_SECRET)
curl -X POST "https://dearfuture.onrender.com/api/cron/send-emails?secret=YOUR_CRON_SECRET"
```

---

## 🎯 What's Changed

### Frontend (Client)
- ✅ New landing page with animations
- ✅ Separate compose page for logged-in users
- ✅ Updated auth pages (login/signup) with dark theme
- ✅ Updated dashboard with dark theme
- ✅ Unified design system (theme.css)
- ✅ Protected routes
- ✅ Better navigation

### Backend (Server)
- ✅ User authentication (JWT)
- ✅ User model with password hashing
- ✅ Auth routes (signup, login, logout)
- ✅ Protected message routes
- ✅ Health check endpoint
- ✅ External cron trigger endpoint
- ✅ Messages linked to users
- ✅ Messages marked as delivered (not deleted)

---

## 🎉 You're Ready!

Your app now has:
1. ✅ Beautiful, cohesive UI with smooth animations
2. ✅ User authentication system
3. ✅ Message history dashboard
4. ✅ Solution for Render free tier (external cron)
5. ✅ Secure message delivery
6. ✅ Professional landing page

**Next Step**: Commit and push the changes, then update your Render environment variables!

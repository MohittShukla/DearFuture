require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const messagesRouter = require('./routes/messages');
const authRouter = require('./routes/auth');
require('./scheduler/sendEmails'); // Start the email scheduler

const app = express();

try {
  const pathToRegexp = require('path-to-regexp');
  if (pathToRegexp && typeof pathToRegexp.pathToRegexp === 'function') {
    const originalFn = pathToRegexp.pathToRegexp;
    pathToRegexp.pathToRegexp = function(path, keys, options) {
      if (typeof path === 'string' && (path.startsWith('http://') || path.startsWith('https://'))) {
        try {
          const url = new URL(path);
          path = url.pathname;
          console.log(`Converting URL to pathname: ${url.pathname}`);
        } catch (e) {
          // Not a valid URL, continue with original path
        }
      }
      return originalFn(path, keys, options);
    };
    console.log('Path-to-regexp patched successfully');
  }
} catch (error) {
  console.warn('Failed to patch path-to-regexp:', error.message);
}

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? process.env.CLIENT_URL || 'https://dearfuture.onrender.com'
    : 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(cookieParser());

// Health check endpoint (for monitoring and keeping server alive)
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Cron trigger endpoint (to be called by external cron service)
app.post('/api/cron/send-emails', async (req, res) => {
  try {
    // Optional: Add a secret key for security
    const cronSecret = process.env.CRON_SECRET;
    const providedSecret = req.headers['x-cron-secret'] || req.query.secret;

    if (cronSecret && providedSecret !== cronSecret) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: Invalid cron secret'
      });
    }

    console.log('[Cron Trigger] Manual email check triggered at', new Date().toISOString());

    // Import and run the email scheduler
    const { checkAndSendMessages } = require('./scheduler/sendEmails');

    // Run in background and return immediately
    checkAndSendMessages().catch(err => {
      console.error('[Cron Trigger] Error:', err);
    });

    res.status(200).json({
      success: true,
      message: 'Email check triggered successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('[Cron Trigger] Error triggering email check:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to trigger email check'
    });
  }
});

// API routes
app.use('/api/auth', authRouter);
app.use('/api/messages', messagesRouter);

// Serve static files and handle client routing in production
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the React app
  const clientBuildPath = path.join(__dirname, '../client/dist');
  app.use(express.static(clientBuildPath));

  // Handle React routing, return all requests to React app
  app.use((req, res, next) => {
    // Skip API routes and non-GET requests
    if (req.originalUrl.startsWith('/api') || req.method !== 'GET') {
      return next();
    }
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}
// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

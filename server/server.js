require('dotenv').config();
const express = require('express');
const webpush = require('web-push');
const cors = require('cors');
// const bodyParser = require('body-parser');

const app = express();


const logger = (req, res, next) => {
  const time = new Date().toLocaleTimeString();
  console.log(`[${time}] ${req.method}  → ${req.url}`);
  next();
};
app.use(logger);

const timer = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`⏱️ ${req.method} ${req.url} took ${duration}ms`);
  });
  next();
};
app.use(timer);

app.use(cors( {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:3000',
      'https://your-production-domain.com'
    ];

    // Allow requests with no origin (like mobile apps or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true // allows cookies, auth headers, etc.
}));

app.use(express.json());

webpush.setVapidDetails(
  'mailto:oramuluemmanuel294@gmail.com', // Replace with your email
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

// In a real app, you would save this to a Database (MongoDB/PostgreSQL)
let subscriptions = [];

// Endpoint to receive subscription from frontend
app.post('/subscribe', (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription); // Save to "DB"
  res.status(201).json({});
  console.log('New subscription received');
});

// Endpoint to trigger a notification (test)
// server/server.js

app.post('/send-notification', async (req, res) => {
  const payload = JSON.stringify({
    title: 'Library Alert 📖',
    body: 'Time to log your reading progress!',
    url: '/books'
  });

  console.log(`Attempting to send to ${subscriptions.length} subscribers...`);

  const notifications = subscriptions.map(async (sub, index) => {
    try {
      await webpush.sendNotification(sub, payload);
    } catch (err) {
      // THIS IS THE CRITICAL LOG:
      console.error(`--- Error for sub ${index} ---`);
      console.error(`Status Code: ${err.statusCode}`);
      console.error(`Body: ${err.body}`); // Look for "Unauthorized", "InvalidRegistration", etc.
      
      if (err.statusCode === 404 || err.statusCode === 410) {
        console.log(`Sub ${index} is expired/gone. Marking for removal.`);
        subscriptions[index] = null;
      }
    }
  });

  await Promise.all(notifications);
  subscriptions = subscriptions.filter(sub => sub !== null);
  
  res.status(200).json({ message: 'Push sequence completed.' });
  console.log('Actual push operations finished ✅');
});


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
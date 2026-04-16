const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authenticateJWT = require('./middleware/auth');   // ← Your new middleware

dotenv.config();   // Load .env variables

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}));

// Logger (optional)
const logger = (req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
};
app.use(logger);

// ======================
// PUBLIC ROUTES
// ======================
app.get('/', (req, res) => {
  res.send('Public homepage - No authentication required');
});

// Login route - Issue real JWT
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // TODO: In real app, validate email/password against database + hash with bcrypt
  // For demo, we'll accept any email with password "123456"
  if (!email || password !== '123456') {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  // Create JWT payload
  const payload = {
    id: 1,
    email: email,
    name: 'Emmanuel',
    role: 'user'          // You can add roles for authorization later
  };

  // Sign the token (expires in 1 hour - good practice)
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1h',      // Short-lived access token
    algorithm: 'HS256'
  });

  res.json({
    success: true,
    message: 'Login successful',
    token: token,         // Send this to frontend
    user: payload
  });
});

// ======================
// PROTECTED ROUTES
// ======================
app.get('/profile', authenticateJWT, (req, res) => {
  res.json({
    success: true,
    message: 'Protected profile data',
    user: req.user                    // ← Data from JWT
  });
});

app.get('/dashboard', authenticateJWT, (req, res) => {
  res.json({
    success: true,
    message: `Welcome to dashboard, ${req.user.name}!`,
    userRole: req.user.role
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
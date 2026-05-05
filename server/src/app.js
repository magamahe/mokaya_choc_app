const express = require('express');
const connectDB = require('./config/db'); 
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const path = require('path');

require('dotenv').config();
const chatRoutes = require("./routes/chat.routes");
const app = express(); 

// DB
connectDB();

// =========================
// RATE LIMIT (SOLO LOGIN)
// =========================
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: process.env.NODE_ENV === 'production' ? 10 : 1000, 
  message: 'Demasiados intentos de login. Intentá más tarde.',
  standardHeaders: true,
  legacyHeaders: false,
});

// =========================
// MIDDLEWARES
// =========================
app.use(cors());
app.use(express.json());

// =========================
// API ROUTES
// =========================

// Login solo protegido
app.use('/api/auth/login', loginLimiter);

// Rutas normales (sin límite global)
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

app.use('/api', chatRoutes); 
// =========================
// TEST API
// =========================
app.get('/api', (req, res) => {
  res.send('API funcionando 🍫');
});

// =========================
// SERVIR FRONTEND
// =========================
app.use(express.static(path.join(__dirname, '../public')));

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// =========================
//  SERVER
// =========================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server en puerto ${PORT}`);
});
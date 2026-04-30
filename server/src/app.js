const express = require('express');
const connectDB = require('./config/db'); 
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const app = express(); 

// DB
connectDB();

// RATE LIMIT
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Demasiadas peticiones desde esta IP'
});

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(limiter);

// API
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

// TEST API
app.get('/api', (req, res) => {
  res.send('API funcionando 🍫');
});


// SERVIR FRONTEND
app.use(express.static(path.join(__dirname, '../public')));

// Cualquier ruta que no sea /api, servir el index.html para que React maneje el routing
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});
// PORT 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server en puerto ${PORT}`));
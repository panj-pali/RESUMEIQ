const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.use(cookieParser());

// Middleware to parse JSON requests
app.use(express.json());

// Import routes
const authRoutes = require('./route/auth.routes');

app.use('/api/auth', authRoutes);

module.exports = app;
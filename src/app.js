const express = require('express');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Import routes
const authRoutes = require('./route/auth.routes');

app.use('/api/auth', authRoutes);

module.exports = app;
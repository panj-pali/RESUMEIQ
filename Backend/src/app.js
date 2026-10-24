
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoutes = require('./route/auth.routes');
const interviewRouter = require('./route/interview.routes');

const app = express();

const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    ...(process.env.FRONTEND_URL || '')
        .split(',')
        .map((origin) => origin.trim())
        .filter(Boolean)
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});
app.use('/api/auth', authRoutes);
app.use('/api/interview', interviewRouter);

module.exports = app;

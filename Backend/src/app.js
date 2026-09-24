const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require("cors");

app.use(cookieParser());
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}));

// Middleware to parse JSON requests
app.use(express.json());

// Import routes
const authRoutes = require('./route/auth.routes');
const interviewRouter =require("./route/interview.routes")

app.use('/api/auth', authRoutes);
app.use('/api/interview',interviewRouter);


module.exports = app;
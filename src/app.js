require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const app = express();
const indexRouter = require('./routers/index');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

// Routes
app.use('/v1', indexRouter);

// Error handling
app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
});

module.exports = app;
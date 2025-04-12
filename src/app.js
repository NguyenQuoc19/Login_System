require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Error handling
app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
});

module.exports = app;
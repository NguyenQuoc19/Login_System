const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Error handling
app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
});

module.exports = app;
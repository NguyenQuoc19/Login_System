require('dotenv').config();

const express = require('express');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const indexRouter = require('./routers/index');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan('dev'));
app.use(compression());

// Database connection
const database = require('./dbs/init.mongoDB');
// Monitor system resources
const { monitorSystemResources } = require('./helpers/db.connections');
monitorSystemResources();

// Routes
app.use('/v1', indexRouter);

// Error handling
app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
});

module.exports = app;
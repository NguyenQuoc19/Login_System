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
app.use('/', indexRouter);

// Error handling
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({
        status: false,
        code: statusCode,
        message: err.message || 'Internal Server Error'
    });
});

module.exports = app;
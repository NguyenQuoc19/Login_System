'use strict';

const os = require('os');
const process = require('process');
const mongoose = require('mongoose');

const _SECOND = 5000;

// Middleware to count the number of connections
const countConnections = (req, res, next) => {
    const connections = mongoose.connections.length;
    return connections;
}

// Middleware help to monitor system resources every _SECOND milliseconds
const monitorSystemResources = (req, res, next) => {
    setInterval(() => {
        const connections = mongoose.connections.length;
        const numberOfCores = os.cpus().length;
        const numberMemoryUsage = process.memoryUsage().rss;

        // Overload if memory usage is more than 80% of the total memory
        if (numberMemoryUsage > os.totalmem() * 0.8) {
            const usageMemory = Math.round((numberMemoryUsage / 1024 / 1024), 2);
            console.error(`Server is overloaded. Memory usage is ${usageMemory} MB`);
        }

        // Overload if connections are more than 80% of the number of cores.
        // Assuming each core can handle 5 connections
        if (connections > numberOfCores * 5 * 0.8) {
            console.error(`Server is overloaded. The total number of connections is ${connections}`);
            // return res.status(503).json({ error: 'Server is overloaded' });
        }
    }, _SECOND);
}

module.exports = { countConnections, monitorSystemResources };

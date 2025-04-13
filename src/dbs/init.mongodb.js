'use strict';

const mongoose = require('mongoose');
const { db: { port, host, name } } = require('../configs/db.config');
const { countConnections, monitorSystemResources } = require('../helpers/db.connections');

const connectDB = `mongodb://${host}:${port}/${name}`;

class Database {
    constructor() {
        this.connect();
    }

    connect(type = 'mongodb') {
        if (1 === 1) {
            mongoose.set('debug', true);
            mongoose.set('debug', { color: true });
        }

        mongoose
            .connect(connectDB, {
                maxPoolSize: 50,
                minPoolSize: 1,
            })
            .then(() => console.log('MongoDB connected. Total connections:', countConnections()))
            .catch(err => console.error('MongoDB connection error:', err));
    }

    static getInstance = () => {
        if (!Database.instance) {
            Database.instance = new Database();
        }

        return Database.instance;
    }
}

const instanceMongoDB = Database.getInstance();
mongoose.exports = instanceMongoDB;

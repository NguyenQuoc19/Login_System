'use strict'

const DEFAULT_ENV = 'development';

const development = {
    app: {
        port: process.env.DEV_PORT
    },
    db: {
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    }
};

module.exports = development;
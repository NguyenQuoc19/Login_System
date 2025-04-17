const { findByKey } = require('../services/api.key.service');

const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization'
}

// Middleware to check API key
const apiKey = async (req, res, next) => {
    try {
        const key = req.headers[HEADER.API_KEY]?.toString();

        // Check if the API key is present in the request headers
        if (!key) {
            return res.status(403).json({
                status: false,
                message: 'API key is missing'
            });
        }

        // Find the API key in the database
        const objectKey = await findByKey(key);
        if (!objectKey) {
            return res.status(403).json({
                status: false,
                message: 'Could not find the API key has been requested'
            });
        }

        // Assign API key to request if key is valid
        req.objectKey = objectKey;
        return next();
    } catch (error) {
        next(error);

    }
}

// Middleware to check the permissions of the key
const apiKeyPermission = (permission) => {
    return (req, res, next) => {
        try {
            console.log("Permission::", permission);
            console.log("Permission::", req);

            if (!req.objectKey.permissions) {
                return res.status(403).json({
                    status: false,
                    message: 'Permission denied'
                });
            }

            // Check if the API key has the required permission
            if (!req.objectKey.permissions.includes(permission)) {
                return res.status(403).json({
                    status: false,
                    message: 'Permission denied'
                });
            }

            return next();
        } catch (error) {
            console.error("Error in apiKeyPermission middleware:", error);
            next(error);
        }
    }
}

module.exports = { apiKey, apiKeyPermission };
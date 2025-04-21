const JWT = require('jsonwebtoken');

const { asyncHandle } = require('../helpers/async.handle');
const { findKeyByUserId } = require('../services/key.token.service');
const { AuthFailureError, NotFound } = require('../core/error.response');

const HEADERS = {
    API_KEY: 'x-api-key',
    CLIENT_ID: 'x-client-id',
    AUTHORIZATION: 'authorization'
}

const createKeyTokenPair = (payload, publicKey, privateKey) => {
    try {
        // Covert the public key object to to a public key string
        const publicKeyString = publicKey.export({
            type: 'pkcs1',
            format: 'pem'
        }).toString();

        // Create an access token base on private key
        const accessToken = JWT.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '1 days',
        });

        // Create a refresh token base on private key
        // The refresh token is used to get a new access token
        const refreshToken = JWT.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '7 days',
        });

        // Verify the access token using the public key string
        JWT.verify(accessToken, publicKeyString, (err, decoded) => {
            if (err) {
                console.error('JWT verification failed:', err);
            } else {
                console.log('Decoded JWT:', decoded);
            }
        });

        return { accessToken, refreshToken };
    } catch (error) {
        return error;
    }
}

// Middleware to verify the User data
const verifyAuthentication = asyncHandle(async (req, res, next) => {
    // 1. Verify the User ID in the request headers
    const userId = req.headers[HEADERS.CLIENT_ID]?.toString();
    if (!userId) throw new AuthFailureError('Invalid Request!');

    console.log(req.headers);
    // 2. Verify the access token using the public key string
    const accessToken = req.headers[HEADERS.AUTHORIZATION]?.toString();
    if (!accessToken) throw new AuthFailureError('Invalid Request!');

    // 3. Get key token from the database by userId
    const keyStore = await findKeyByUserId(userId);
    if (!keyStore) throw new NotFound('Key not found!');

    // Compare data get from headers and database
    try {
        const decodeUser = JWT.verify(accessToken, keyStore.publicKey);
        if (userId !== decodeUser.userId) throw new AuthFailureError('Invalid User!');
        req.keyStore = keyStore;
        return next();
    } catch (error) {
        throw error;
    }
});

const validateJWT = async (token, keySecret) => {
    return await JWT.verify(token, keySecret);
}

module.exports = { createKeyTokenPair, verifyAuthentication, validateJWT };
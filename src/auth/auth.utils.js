const JWT = require('jsonwebtoken');

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

module.exports = { createKeyTokenPair };
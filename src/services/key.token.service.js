const KeyModel = require('../models/key.token.model');

class KeyService {
    static createKeyToken = async ({ userId, publicKey, refreshToken }) => {
        // Convert the public key to a string
        const publicKeyString = publicKey.export({
            type: 'pkcs1',
            format: 'pem'
        }).toString();

        const filter = { user: userId };
        const update = { publicKeyString, refreshTokenUsed: [], refreshToken };
        const options = { new: true, upsert: true };
        const tokens = await KeyModel.findOneAndUpdate(filter, update, options);

        return tokens ? tokens.publicKey : null;
    }
}

module.exports = KeyService;
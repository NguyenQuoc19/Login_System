const KeyModel = require('../models/key.token.model');

class KeyService {
    static createKeyToken = async ({ userId, publicKey }) => {
        try {
            // Convert the public key to a string
            const publicKeyString = publicKey.toString();

            // Create a new key token base on the user ID and public key
            // Save it to the database
            const token = await KeyModel.create({
                user: userId,
                publicKey: publicKeyString,
            })

            // Return the public key string get from the database
            return token ? token.publicKey : null;
        } catch (error) {
            return error;
        }
    }
}

module.exports = KeyService;
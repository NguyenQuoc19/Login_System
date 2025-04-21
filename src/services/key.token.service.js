const KeyModel = require('../models/key.token.model');

const { Types } = require('mongoose');
class KeyService {
    static createKeyToken = async ({ userId, publicKey, refreshToken }) => {
        const filter = { user: userId };
        const update = { publicKey, refreshTokenUsed: [], refreshToken };
        const options = { new: true, upsert: true };

        try {
            const tokens = await KeyModel.findOneAndUpdate(filter, update, options);
            return tokens ? tokens.publicKey : null;
        } catch (error) {
            throw error;
        }
    }

    static findKeyByUserId = async (userId) => {
        return await KeyModel.findOne({ user: new Types.ObjectId(userId) }).lean();
    }

    static findUsedRefreshToken = async (refreshToken) => {
        return await KeyModel.findOne({ refreshTokensUsed: refreshToken }).lean();
    }

    static findKeyByRefreshToken = async (refreshToken) => {
        return await KeyModel.findOne({ refreshToken: refreshToken });
    }

    static deleteKeyById = async (id) => {
        return await KeyModel.deleteOne({ _id: new Types.ObjectId(id) });
    }

    static deleteKeyByUserId = async (userId) => {
        return await KeyModel.deleteOne({ user: new Types.ObjectId(userId) });
    }
}

module.exports = KeyService;
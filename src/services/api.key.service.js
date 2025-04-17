const ApiKeyModel = require('../models/api.key.model');
// const Crypto = require('node:crypto');

// This function is used to find an API key by its key value.
const findByKey = async (key) => {
    // Create a new API key to test
    // const testKey = Crypto.randomBytes(32).toString('hex');
    // console.log("Test Key::", testKey);
    // ApiKeyModel.create({ key: testKey, status: true, permissions: ['000'], });
    const objectKey = await ApiKeyModel.findOne({ key, status: true }).lean();
    return objectKey;
}

module.exports = { findByKey };
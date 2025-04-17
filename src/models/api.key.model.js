const mongoose = require('mongoose');

const DOCUMENT_NAME = 'ApiKey';
const COLLECTION_NAME = 'ApiKeys';

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: Boolean,
        default: true,
    },
    permissions: {
        type: [String],
        required: true,
        enum: ['000', '111', '222']
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '30d' // The key will expire after 30 days
    },
}, {
    collection: COLLECTION_NAME,
    timestamps: true
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, userSchema);
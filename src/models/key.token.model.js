const { Schema, model } = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Key'; // Name of the document in MongoDB
const COLLECTION_NAME = 'Keys'; // Name of the collection in MongoDB

// Declare the Schema of the Mongo model
var keySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    publicKey: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: Array,
        default: [],
    }
}, {
    collection: COLLECTION_NAME,
    timestamps: true
});

//Export the model
module.exports = model(DOCUMENT_NAME, keySchema);
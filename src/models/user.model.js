const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Used for password hashing

const DOCUMENT_NAME = 'User'; // Name of the document in MongoDB
const COLLECTION_NAME = 'Users'; // Name of the collection in MongoDB
// Define the user schema 

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true, // Ensures email is unique
        lowercase: true, // Normalizes email to lowercase
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Invalid email format'], // Regex for email validation
        index: true // Speeds up email search queries
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters'],
        select: false // Excludes password from default queries
    },
    username: {
        type: String,
        unique: true,
        trim: true,
        // sparse: true // Index applies only when username exists
    },
    status: {
        type: Number, // Indicates user status
        enum: [1, 2, 3], // Restricts status values
        default: 1
    },
    verify: {
        type: mongoose.Schema.Types.Boolean, // Indicates if the user is verified
        default: false
    },
    role: {
        type: Number,
        enum: [1, 2, 3], // Restricts role values
        default: 3,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    collection: COLLECTION_NAME, // Specifies the collection name
    timestamps: true // Automatically manages createdAt, updatedAt
});

// Additional index for performance
// userSchema.index({ username: 1 }, { sparse: true });

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12); // 12 salt rounds
    next();
});

// Compare password for login
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model(DOCUMENT_NAME, userSchema);

module.exports = User;
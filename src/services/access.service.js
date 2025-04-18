const User = require('../models/user.model');
const bcrypt = require('bcrypt'); // Used for password hashingß
const KeyService = require('../services/key.token.service');
const ErrorResponse = require('../core/error.response');

const { pickInfo } = require('../utils');
const { findUserByEmail } = require('../services/user.service');
const { createKeyTokenPair } = require('../auth/auth.utils');
const { generateKeyPairSync, createPublicKey } = require('node:crypto');

const roles = {
    MODERATOR: 1,
    ADMIN: 2,
    USER: 3,
}

class AccessService {
    // Sign up a new user
    static signUp = async ({ username, email, password }) => {
        // Check if the user already exists
        const holderUser = await User.findOne({ email }).lean();
        if (holderUser) throw new ConflictRequestError('Failed to create user!');

        // Create a new user based on the payload
        const newUser = await User.create({ username, email, password, roles: roles.ADMIN });
        if (!newUser) throw new ErrorResponse.BadRequestError('Failed to create user!');

        // Generate a new public key and new private key
        const { publicKey, privateKey } = await this.#generateKeys();

        // Get the public key string after it has been created
        const publicKeyString = await KeyService.createKeyToken({ userId: newUser._id, publicKey });
        if (!publicKeyString) throw new ErrorResponse.BadRequestError('Failed to create token!');

        // Create JWT token based on the User Data, Public Key and Private Key
        const tokens = await createKeyTokenPair(
            { userId: newUser._id, email: newUser.email, userName: newUser.userName },
            createPublicKey(publicKeyString),  // Convert the public key string in database to a public key object
            privateKey
        );
        if (!tokens) throw new ErrorResponse.BadRequestError('Failed to create token!');

        return {
            user: pickInfo(newUser, ['_id', 'username', 'email']),
            tokens
        };
    }

    // Login a user
    static login = async ({ email, password }) => {
        // 1. Check the email is exists in the database
        const user = await findUserByEmail({ email, select: { email: 1, password: 1, username: 1 } });
        if (!user) throw new ErrorResponse.AuthFailureError('Invalid email or password!');

        // 2. Match the password with the hashed password in the database
        const isMatch = await user.comparePassword(password);
        if (!isMatch) throw new ErrorResponse.AuthFailureError('Authentication Error!');

        // 3. Create a new public key and new private key
        const { publicKey, privateKey } = await this.#generateKeys();

        // 4. Generate the token
        const tokens = await createKeyTokenPair(
            { userId: user._id, email: user.email, userName: user.username },
            createPublicKey(publicKey),
            privateKey
        );
        if (!tokens) throw new BadRequestError('Failed to create token!');

        await KeyService.createKeyToken({
            refreshToken: tokens.refreshToken,
            publicKey,
            userId: user._id,
            password
        });

        // 5. Return the user and token
        return {
            user: pickInfo(user, ['_id', 'username', 'email']),
            tokens
        };
    }

    // Generate a new public key and new private key
    static #generateKeys = async () => {
        return await generateKeyPairSync(
            'rsa',
            {
                modulusLength: 4096,
                publicKeyEncoding: {
                    type: 'pkcs1',
                    format: 'pem'
                },
                privateKeyEncoding: {
                    type: 'pkcs1',
                    format: 'pem'
                }
            }
        );
    }
}

module.exports = AccessService;
const User = require('../models/user.model');
const KeyService = require('../services/key.token.service');
const { pickInfo } = require('../utils');
const { createKeyTokenPair } = require('../auth/auth.utils');
const { generateKeyPairSync, createPublicKey } = require('node:crypto');
const { BadRequestError, ConflictRequestError } = require('../core/error.response');

const roles = {
    MODERATOR: 1,
    ADMIN: 2,
    USER: 3,
}

class AccessService {
    static signUp = async ({ username, email, password }) => {
        // Check if the user already exists
        const holderUser = await User.findOne({ email }).lean();
        if (holderUser) {
            throw new ConflictRequestError('The User with that email is already exists!');
        }

        // Create a new user based on the payload
        const newUser = await User.create({
            username,
            email,
            password,
            roles: roles.ADMIN,
        });

        // Check if the user was not created successfully
        if (!newUser) {
            return {
                code: 500,
                status: false,
                message: "Failed to create user!",
                data: null,
            };
        }

        // Generate a new public key and new private key
        const { privateKey, publicKey } = await generateKeyPairSync(
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

        // Get the public key string after it has been created
        const publicKeyString = await KeyService.createKeyToken({
            userId: newUser._id,
            publicKey,
        });

        // Create the public key string is failed
        if (!publicKeyString) {
            throw new BadRequestError('Failed to create public key string!');
        }

        // Convert the public key string in database to a public key object
        const publicKeyObject = createPublicKey(publicKeyString);

        // Create JWT token based on the User Data, Public Key and Private Key
        const token = await createKeyTokenPair(
            {
                userId: newUser._id,
                email: newUser.email,
                userName: newUser.userName
            },
            publicKeyObject,
            privateKey
        );

        if (!token) {
            throw new BadRequestError('Failed to create token!');
        }

        return {
            code: 201,
            status: true,
            message: "User created successfully!",
            data: {
                user: pickInfo(newUser, ['_id', 'username', 'email']),
                token
            },
        };
    }
}

module.exports = AccessService;
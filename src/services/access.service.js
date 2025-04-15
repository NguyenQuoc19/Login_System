const User = require('../models/user.model');
const KeyService = require('./key.service');
const { pickInfo } = require('../utils');
const { createKeyTokenPair } = require('../utils/auth.utils');
const { generateKeyPairSync, createPublicKey } = require('node:crypto');

const roles = {
    MODERATOR: 1,
    ADMIN: 2,
    USER: 3,
}

class AccessService {
    static signUp = async ({ username, email, password }) => {
        try {
            // Check if the user already exists
            const holderUser = await User.findOne({ email }).lean();
            if (holderUser) {
                return {
                    code: 409,
                    status: false,
                    message: "The User with that email is already exists!",
                };
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
            const { publicKey, privateKey } = await generateKeyPairSync(
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
                return {
                    code: 201,
                    status: false,
                    message: "Failed to create key token!",
                };
            }

            // Convert the public key string in database to a public key object
            // This is used to verify the token
            // and to sign the token
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

            console.log('Token:', token);
            if (!token) {
                return {
                    code: 500,
                    status: false,
                    message: "Failed to create token!",
                };
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
        } catch (error) {
            return {
                code: 500,
                status: false,
                message: error.message,
                data: null,
            }
        }
    }
}

module.exports = AccessService;
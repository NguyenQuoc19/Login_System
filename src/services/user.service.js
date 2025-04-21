const User = require("../models/user.model");

const { Types } = require('mongoose');

const findUserById = async ({
    id,
    select = { email: 1, password: 1, roles: 1, username: 1 }
}) => {
    return await User.findOne({ _id: id }).select(select);
}

const findUserByEmail = async ({
    email,
    select = { email: 1, password: 1, roles: 1, username: 1 }
}) => {
    return await User.findOne({ email: email.toLowerCase() }).select(select);
}

module.exports = { findUserById, findUserByEmail }
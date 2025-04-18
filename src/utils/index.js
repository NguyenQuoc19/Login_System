const _ = require('lodash');

const pickInfo = (object = {}, fields = []) => {
    return _.pick(object, fields);
}


const asyncHandle = fn => {
    return (req, res, next) => {
        return fn(req, res, next).catch(next);
    };
}

module.exports = { pickInfo, asyncHandle };
const _ = require('lodash');

const pickInfo = (object = {}, fields = []) => {
    return _.pick(object, fields);
}

module.exports = { pickInfo };
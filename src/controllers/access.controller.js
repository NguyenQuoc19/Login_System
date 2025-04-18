const AccessService = require('../services/access.service');

const { Success, Created } = require('../core/success.response');

class AccessController {
    signUp = async (req, res, next) => {
        new Created({
            message: "Create user successfully!",
            data: await AccessService.signUp(req.body),
        }).send(res);
    }
}

module.exports = new AccessController();
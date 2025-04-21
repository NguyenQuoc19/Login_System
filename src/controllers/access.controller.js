const AccessService = require('../services/access.service');

const { Success, Created } = require('../core/success.response');

class AccessController {
    login = async (req, res, next) => {
        new Success({
            message: "Login successfully!",
            data: await AccessService.login(req.body),
            statusCode: res.statusCode,
        }).send(res);
    }

    logout = async (req, res, next) => {
        new Success({
            message: "Logout successfully!",
            data: await AccessService.logout(req.keyStore),
            statusCode: res.statusCode,
        }).send(res);
    }

    signUp = async (req, res, next) => {
        new Created({
            statusCode: 201,
            message: "Create user successfully!",
            data: await AccessService.signUp(req.body),
        }).send(res);
    }
}

module.exports = new AccessController();
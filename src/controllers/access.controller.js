const AccessService = require('../services/access.service');

const { Success, Created } = require('../core/success.response');

class AccessController {
    login = async (req, res, next) => {
        new Success({
            message: "Login successfully!",
            data: await AccessService.login(req.body)
        }).send(res);
    }

    logout = async (req, res, next) => {
        new Success({
            message: "Logout successfully!",
            data: await AccessService.logout(req.keyStore)
        }).send(res);
    }

    refreshToken = async (req, res, next) => {
        new Success({
            message: "Get Token success!",
            data: await AccessService.refreshToken(req.body.refreshToken)
        }).send(res);
    }

    signUp = async (req, res, next) => {
        new Created({
            message: "Create user successfully!",
            data: await AccessService.signUp(req.body),
        }).send(res);
    }
}

module.exports = new AccessController();
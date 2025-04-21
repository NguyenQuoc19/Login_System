const STATUS_CODES = {
    OK: 200,
    CREATED: 201,
}

const REASONS_STATUS_CODE = {
    OK: "OK!",
    CREATED: "Created successfully!",
}

class SuccessResponse {
    constructor({
        message,
        statusCode = STATUS_CODES.OK,
        reasons = REASONS_STATUS_CODE.OK,
        data = {}
    }) {
        this.data = data;
        this.status = statusCode;
        this.message = message ?? reasons;
    }

    send(res, headers = {}) {
        return res.status(this.status).json(this);
    }
}

class Success extends SuccessResponse {
    constructor({
        message = REASONS_STATUS_CODE.OK,
        statusCode = STATUS_CODES.OK,
        reasons = REASONS_STATUS_CODE.OK,
        data = {}
    }) {
        super({ message, statusCode, reasons, data });
    }
}

class Created extends SuccessResponse {
    constructor({
        message = REASONS_STATUS_CODE.CREATED,
        statusCode = STATUS_CODES.CREATED,
        reasons = REASONS_STATUS_CODE.CREATED,
        data = {}
    }) {
        super({ message, statusCode, reasons, data });
    }
}

module.exports = { Success, Created };
const STATUS_CODES = {
    SUCCESS: 200,
    CREATED: 201,
}

const REASONS_STATUS_CODE = {
    SUCCESS: "Successfully!",
    CREATED: "Created successfully!",
}

class SuccessResponse {
    constructor({
        message,
        statusCode = STATUS_CODES.SUCCESS,
        reasons = REASONS_STATUS_CODE.SUCCESS,
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
        message = REASONS_STATUS_CODE.SUCCESS,
        statusCode = STATUS_CODES.SUCCESS,
        reasons = REASONS_STATUS_CODE.SUCCESS,
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
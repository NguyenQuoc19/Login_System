const STATUS_CODES = {
    CONFLICT: 409,
    FORBIDDEN: 403,
}

const REASONS_STATUS_CODE = {
    CONFLICT: "Conflict error!",
    FORBIDDEN: "Bad request!",
}

class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

// The function is used to handle the forbidden error
class BadRequestError extends ErrorResponse {
    constructor(message = REASONS_STATUS_CODE.FORBIDDEN, statusCode = STATUS_CODES.FORBIDDEN) {
        super(message, statusCode);
    }
}

// The function is used to handle the conflict error
class ConflictRequestError extends ErrorResponse {
    constructor(message = REASONS_STATUS_CODE.CONFLICT, statusCode = STATUS_CODES.CONFLICT) {
        super(message, statusCode);
    }
}

module.exports = { BadRequestError, ConflictRequestError };
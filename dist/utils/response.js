"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSuccess = sendSuccess;
exports.sendError = sendError;
const pino_1 = __importDefault(require("pino"));
// Initialize logger
const logger = (0, pino_1.default)({
    level: process.env.LOG_LEVEL || 'info',
});
/**
 * Send success response
 * @param res - Express Response object
 * @param data - Response data (can be null)
 * @param message - Success message (optional)
 * @param status - HTTP status code (default: 200)
 * @param meta - Additional metadata like pagination (optional)
 */
function sendSuccess(res, data = null, message = null, status = 200, meta) {
    const body = {
        status: 'success',
        message: message ?? null,
        data: data,
    };
    // Add meta if provided
    if (meta) {
        body.meta = meta;
    }
    return res.status(status).json(body);
}
/**
 * Send error response
 * @param res - Express Response object
 * @param message - Error message (optional)
 * @param status - HTTP status code (default: 400)
 */
function sendError(res, message = null, status = 400) {
    // Validate status code range (100-599). Fall back to 500 if invalid.
    const code = Number.isInteger(status) && status >= 100 && status < 600 ? status : 500;
    // Log server/internal errors (5xx) as errors. Log client errors (4xx) at info
    // to avoid noisy error-level logs for expected authorization failures.
    if (message) {
        if (code >= 500) {
            logger.error(message);
        }
        else {
            logger.info(message);
        }
    }
    const body = {
        status: 'error',
        message: message ?? null,
        data: null,
    };
    return res.status(code).json(body);
}
// Export default object for convenience
exports.default = { sendSuccess, sendError };
//# sourceMappingURL=response.js.map
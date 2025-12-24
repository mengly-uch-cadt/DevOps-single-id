"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateBasicAuth = void 0;
const accesses_service_1 = require("../services/accesses.service");
const response_1 = require("../utils/response");
/**
 * Basic Auth middleware that validates access using allow_endpoint (username) and token (password)
 * from the accesses table
 */
const authenticateBasicAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Basic ')) {
            (0, response_1.sendError)(res, 'Missing or invalid Authorization header', 401);
            return;
        }
        // Decode Base64 credentials
        const base64Credentials = authHeader.substring(6); // Remove 'Basic ' prefix
        const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
        // Split only on the last colon to handle URLs with colons (e.g., http://127.0.0.1:3001:TOKEN)
        const lastColonIndex = credentials.lastIndexOf(':');
        const allow_endpoint = credentials.substring(0, lastColonIndex);
        const token = credentials.substring(lastColonIndex + 1);
        console.log('Basic Auth attempt:', { allow_endpoint, token: token?.substring(0, 20) + '...' });
        if (!allow_endpoint || !token) {
            (0, response_1.sendError)(res, 'Invalid credentials format', 401);
            return;
        }
        // Validate credentials against accesses table
        const isValid = await accesses_service_1.accessesService.validateBasicAuth(allow_endpoint, token);
        console.log('Basic Auth valid:', isValid);
        if (!isValid) {
            (0, response_1.sendError)(res, 'Invalid credentials', 401);
            return;
        }
        // Attach access info to request for later use
        req.accessInfo = {
            allow_endpoint,
        };
        next();
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Authentication failed';
        (0, response_1.sendError)(res, message, 500);
    }
};
exports.authenticateBasicAuth = authenticateBasicAuth;
//# sourceMappingURL=auth.basicAuth.js.map
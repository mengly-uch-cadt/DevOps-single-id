"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const auth_service_1 = require("../services/auth.service");
const response_1 = require("../utils/response");
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        (0, response_1.sendError)(res, 'Authorization header is required', 401);
        return;
    }
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        (0, response_1.sendError)(res, 'Invalid authorization format. Use: Bearer <token>', 401);
        return;
    }
    const token = parts[1];
    const decoded = auth_service_1.authService.verifyToken(token);
    if (!decoded) {
        (0, response_1.sendError)(res, 'Invalid or expired token', 401);
        return;
    }
    req.user = decoded;
    next();
};
exports.authenticateJWT = authenticateJWT;
//# sourceMappingURL=auth.jwt.js.map
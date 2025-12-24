"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
const response_1 = require("../utils/response");
class AuthController {
    async login(req, res) {
        try {
            const { user_id, hash } = req.body;
            const result = await auth_service_1.authService.login(user_id, hash);
            if (!result) {
                (0, response_1.sendError)(res, 'Invalid credentials', 401);
                return;
            }
            (0, response_1.sendSuccess)(res, result);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Internal server error';
            (0, response_1.sendError)(res, message, 500);
        }
    }
}
exports.AuthController = AuthController;
exports.authController = new AuthController();
//# sourceMappingURL=auth.controller.js.map
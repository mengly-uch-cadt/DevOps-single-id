"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const response_1 = require("../utils/response");
const users_controller_1 = require("../controllers/users.controller");
const validate_1 = require("../middlewares/validate");
const users_request_1 = require("../requests/users.request");
const router = (0, express_1.Router)();
// Health check endpoint
router.get('/health', (_req, res) => {
    (0, response_1.sendSuccess)(res, {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
    }, 'Service is healthy');
});
// Public user registration (syncs to notification service)
router.post('/register', (0, validate_1.validate)(users_request_1.createUserRequest), users_controller_1.usersController.create);
exports.default = router;
//# sourceMappingURL=public.routes.js.map
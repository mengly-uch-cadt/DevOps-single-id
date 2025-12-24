"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const validate_1 = require("../middlewares/validate");
const auth_request_1 = require("../requests/auth.request");
const auth_basicAuth_1 = require("../middlewares/auth.basicAuth");
const router = (0, express_1.Router)();
// Login endpoint requires Basic Auth (allow_endpoint:token)
router.post('/login', auth_basicAuth_1.authenticateBasicAuth, (0, validate_1.validate)(auth_request_1.loginRequest), auth_controller_1.authController.login);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map
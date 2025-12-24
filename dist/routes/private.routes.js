"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const settings_routes_1 = __importDefault(require("./settings.routes"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const accesses_routes_1 = __importDefault(require("./accesses.routes"));
const users_routes_1 = __importDefault(require("./users.routes"));
const auth_jwt_1 = require("../middlewares/auth.jwt");
const router = (0, express_1.Router)();
// Auth routes (no JWT middleware - handles own auth via Bearer token)
router.use('/auth', auth_routes_1.default);
// Apply JWT authentication to all other private routes
router.use(auth_jwt_1.authenticateJWT);
// CRUD routes
router.use('/accesses', accesses_routes_1.default);
router.use('/users', users_routes_1.default);
router.use('/settings', settings_routes_1.default);
exports.default = router;
//# sourceMappingURL=private.routes.js.map
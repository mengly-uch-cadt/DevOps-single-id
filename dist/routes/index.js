"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const public_routes_1 = __importDefault(require("./public.routes"));
const private_routes_1 = __importDefault(require("./private.routes"));
const sys_routes_1 = __importDefault(require("./sys.routes"));
const router = (0, express_1.Router)();
console.log('📍 Mounting routes...');
console.log('Public routes:', public_routes_1.default.stack?.map((r) => r.route?.path));
// Mount public, private, and system route groups
router.use('/public', public_routes_1.default);
router.use('/private', private_routes_1.default);
router.use('/sys', sys_routes_1.default);
console.log('✅ Routes mounted successfully');
exports.default = router;
//# sourceMappingURL=index.js.map
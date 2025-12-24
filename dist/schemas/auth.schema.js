"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ssoLoginSchema = exports.loginSchema = void 0;
const zod_1 = require("zod");
exports.loginSchema = zod_1.z.object({
    user_id: zod_1.z.string().min(1, 'User ID is required'),
    hash: zod_1.z.string().min(1, 'Hash is required'),
});
exports.ssoLoginSchema = zod_1.z.object({
    token: zod_1.z.string().min(1, 'Token is required'),
});
//# sourceMappingURL=auth.schema.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ssoLoginRequest = exports.loginRequest = void 0;
const zod_1 = require("zod");
const auth_schema_1 = require("../schemas/auth.schema");
exports.loginRequest = zod_1.z.object({
    body: auth_schema_1.loginSchema,
});
exports.ssoLoginRequest = zod_1.z.object({
    body: auth_schema_1.ssoLoginSchema,
});
//# sourceMappingURL=auth.request.js.map
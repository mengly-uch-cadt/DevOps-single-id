"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserRequest = exports.createUserRequest = void 0;
const zod_1 = require("zod");
const users_schema_1 = require("../schemas/users.schema");
exports.createUserRequest = zod_1.z.object({
    body: users_schema_1.createUserSchema,
});
exports.updateUserRequest = zod_1.z.object({
    body: users_schema_1.updateUserSchema,
});
//# sourceMappingURL=users.request.js.map
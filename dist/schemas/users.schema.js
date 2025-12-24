"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required').max(255),
    hash: zod_1.z.string().min(1).max(255).optional(),
});
exports.updateUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(255).optional(),
    hash: zod_1.z.string().min(1).max(255).optional(),
});
//# sourceMappingURL=users.schema.js.map
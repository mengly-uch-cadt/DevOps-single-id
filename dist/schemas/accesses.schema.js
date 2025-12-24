"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAccessSchema = exports.createAccessSchema = void 0;
const zod_1 = require("zod");
exports.createAccessSchema = zod_1.z.object({
    allow_endpoint: zod_1.z.string().min(1, 'Endpoint is required').max(255),
});
exports.updateAccessSchema = zod_1.z.object({
    allow_endpoint: zod_1.z.string().min(1).max(255).optional(),
});
//# sourceMappingURL=accesses.schema.js.map
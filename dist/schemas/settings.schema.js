"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBySlugKeySchema = exports.paginationQuerySchema = exports.updateSettingSchema = exports.createSettingSchema = void 0;
const zod_1 = require("zod");
exports.createSettingSchema = zod_1.z.object({
    body: zod_1.z.object({
        slug: zod_1.z.string().min(1).max(100),
        key: zod_1.z.string().min(1).max(255),
        value: zod_1.z.string(),
        description: zod_1.z.string().optional(),
    }),
});
exports.updateSettingSchema = zod_1.z.object({
    body: zod_1.z.object({
        slug: zod_1.z.string().min(1).max(100).optional(),
        key: zod_1.z.string().min(1).max(255).optional(),
        value: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
    }),
});
exports.paginationQuerySchema = zod_1.z.object({
    query: zod_1.z.object({
        page: zod_1.z.string().optional().default('1'),
        limit: zod_1.z.string().optional().default('10'),
    }),
});
exports.getBySlugKeySchema = zod_1.z.object({
    params: zod_1.z.object({
        slug: zod_1.z.string(),
        key: zod_1.z.string(),
    }),
});
//# sourceMappingURL=settings.schema.js.map
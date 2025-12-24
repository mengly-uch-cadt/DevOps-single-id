"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAccessRequest = exports.createAccessRequest = void 0;
const zod_1 = require("zod");
const accesses_schema_1 = require("../schemas/accesses.schema");
exports.createAccessRequest = zod_1.z.object({
    body: accesses_schema_1.createAccessSchema,
});
exports.updateAccessRequest = zod_1.z.object({
    body: accesses_schema_1.updateAccessSchema,
});
//# sourceMappingURL=accesses.request.js.map
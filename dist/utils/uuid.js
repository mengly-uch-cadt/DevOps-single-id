"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UuidUtil = void 0;
const uuid_1 = require("uuid");
class UuidUtil {
    static generate() {
        return (0, uuid_1.v4)();
    }
    static isValid(uuid) {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        return uuidRegex.test(uuid);
    }
}
exports.UuidUtil = UuidUtil;
//# sourceMappingURL=uuid.js.map
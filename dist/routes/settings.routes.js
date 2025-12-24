"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller = __importStar(require("../controllers/settings.controller"));
const request = __importStar(require("../requests/settings.request"));
const validate_1 = require("../middlewares/validate");
const settings_schema_1 = require("../schemas/settings.schema");
const router = (0, express_1.Router)();
router.post('/', (0, validate_1.validate)(settings_schema_1.createSettingSchema), request.createRequest, controller.create);
router.get('/', (0, validate_1.validate)(settings_schema_1.paginationQuerySchema), request.paginationRequest, controller.getAll);
router.get('/:global_id', request.globalIdRequest, controller.getByGlobalId);
router.get('/slug/:slug/:key', (0, validate_1.validate)(settings_schema_1.getBySlugKeySchema), request.slugKeyRequest, controller.getBySlugKey);
router.put('/:global_id', (0, validate_1.validate)(settings_schema_1.updateSettingSchema), request.updateRequest, controller.update);
router.delete('/:global_id', request.idRequest, controller.deleteById);
exports.default = router;
//# sourceMappingURL=settings.routes.js.map
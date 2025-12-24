"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const accesses_controller_1 = require("../controllers/accesses.controller");
const validate_1 = require("../middlewares/validate");
const accesses_request_1 = require("../requests/accesses.request");
const router = (0, express_1.Router)();
router.post('/', (0, validate_1.validate)(accesses_request_1.createAccessRequest), accesses_controller_1.accessesController.create);
router.get('/', accesses_controller_1.accessesController.getAll);
router.get('/:global_id', accesses_controller_1.accessesController.getById);
router.put('/:global_id', (0, validate_1.validate)(accesses_request_1.updateAccessRequest), accesses_controller_1.accessesController.update);
router.delete('/:global_id', accesses_controller_1.accessesController.delete);
exports.default = router;
//# sourceMappingURL=accesses.routes.js.map
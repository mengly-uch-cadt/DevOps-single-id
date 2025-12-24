"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../controllers/users.controller");
const validate_1 = require("../middlewares/validate");
const users_request_1 = require("../requests/users.request");
const router = (0, express_1.Router)();
router.post('/', (0, validate_1.validate)(users_request_1.createUserRequest), users_controller_1.usersController.create);
router.get('/', users_controller_1.usersController.getAll);
router.get('/:global_id', users_controller_1.usersController.getById);
router.put('/:global_id', (0, validate_1.validate)(users_request_1.updateUserRequest), users_controller_1.usersController.update);
router.delete('/:global_id', users_controller_1.usersController.delete);
exports.default = router;
//# sourceMappingURL=users.routes.js.map
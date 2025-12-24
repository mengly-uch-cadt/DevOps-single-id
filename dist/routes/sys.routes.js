"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../controllers/users.controller");
const validate_1 = require("../middlewares/validate");
const users_request_1 = require("../requests/users.request");
const auth_basicAuth_1 = require("../middlewares/auth.basicAuth");
const router = (0, express_1.Router)();
// All system routes require Basic Auth (no JWT needed)
router.use(auth_basicAuth_1.authenticateBasicAuth);
// User CRUD for external systems
router.post('/users', (0, validate_1.validate)(users_request_1.createUserRequest), users_controller_1.usersController.create);
router.get('/users', users_controller_1.usersController.getAll);
router.get('/users/:global_id', users_controller_1.usersController.getById);
router.put('/users/:global_id', (0, validate_1.validate)(users_request_1.updateUserRequest), users_controller_1.usersController.update);
router.delete('/users/:global_id', users_controller_1.usersController.delete);
exports.default = router;
//# sourceMappingURL=sys.routes.js.map
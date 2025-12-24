"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersController = exports.UsersController = void 0;
const users_service_1 = require("../services/users.service");
const response_1 = require("../utils/response");
class UsersController {
    async create(req, res) {
        try {
            const user = await users_service_1.usersService.createUser(req.body);
            (0, response_1.sendSuccess)(res, user, 'User created', 201);
        }
        catch (error) {
            (0, response_1.sendError)(res, error.message, 500);
        }
    }
    async getAll(req, res) {
        try {
            const { page, limit } = req.query;
            const options = page && limit ? { page: Number(page), limit: Number(limit) } : undefined;
            const users = await users_service_1.usersService.getAllUsers(options);
            (0, response_1.sendSuccess)(res, users, 'Users retrieved');
        }
        catch (error) {
            (0, response_1.sendError)(res, error.message, 500);
        }
    }
    async getById(req, res) {
        try {
            const user = await users_service_1.usersService.getUserByGlobalId(req.params.global_id);
            if (!user) {
                (0, response_1.sendError)(res, 'User not found', 404);
                return;
            }
            (0, response_1.sendSuccess)(res, user, 'User retrieved');
        }
        catch (error) {
            (0, response_1.sendError)(res, error.message, 500);
        }
    }
    async update(req, res) {
        try {
            const user = await users_service_1.usersService.getUserByGlobalId(req.params.global_id);
            if (!user) {
                (0, response_1.sendError)(res, 'User not found', 404);
                return;
            }
            const updated = await users_service_1.usersService.updateUser(user.id, req.body);
            (0, response_1.sendSuccess)(res, updated, 'User updated');
        }
        catch (error) {
            (0, response_1.sendError)(res, error.message, 500);
        }
    }
    async delete(req, res) {
        try {
            const user = await users_service_1.usersService.getUserByGlobalId(req.params.global_id);
            if (!user) {
                (0, response_1.sendError)(res, 'User not found', 404);
                return;
            }
            await users_service_1.usersService.deleteUser(user.id);
            (0, response_1.sendSuccess)(res, null, 'User deleted');
        }
        catch (error) {
            (0, response_1.sendError)(res, error.message, 500);
        }
    }
}
exports.UsersController = UsersController;
exports.usersController = new UsersController();
//# sourceMappingURL=users.controller.js.map
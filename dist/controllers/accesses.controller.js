"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessesController = exports.AccessesController = void 0;
const accesses_service_1 = require("../services/accesses.service");
const response_1 = require("../utils/response");
class AccessesController {
    async create(req, res) {
        try {
            const access = await accesses_service_1.accessesService.createAccess(req.body);
            (0, response_1.sendSuccess)(res, access, 'Access created', 201);
        }
        catch (error) {
            (0, response_1.sendError)(res, error.message, 500);
        }
    }
    async getAll(req, res) {
        try {
            const { page, limit } = req.query;
            const options = page && limit ? { page: Number(page), limit: Number(limit) } : undefined;
            const accesses = await accesses_service_1.accessesService.getAllAccesses(options);
            (0, response_1.sendSuccess)(res, accesses, 'Accesses retrieved');
        }
        catch (error) {
            (0, response_1.sendError)(res, error.message, 500);
        }
    }
    async getById(req, res) {
        try {
            const access = await accesses_service_1.accessesService.getAccessByGlobalId(req.params.global_id);
            if (!access) {
                (0, response_1.sendError)(res, 'Access not found', 404);
                return;
            }
            (0, response_1.sendSuccess)(res, access, 'Access retrieved');
        }
        catch (error) {
            (0, response_1.sendError)(res, error.message, 500);
        }
    }
    async update(req, res) {
        try {
            const access = await accesses_service_1.accessesService.getAccessByGlobalId(req.params.global_id);
            if (!access) {
                (0, response_1.sendError)(res, 'Access not found', 404);
                return;
            }
            const updated = await accesses_service_1.accessesService.updateAccess(access.id, req.body);
            (0, response_1.sendSuccess)(res, updated, 'Access updated');
        }
        catch (error) {
            (0, response_1.sendError)(res, error.message, 500);
        }
    }
    async delete(req, res) {
        try {
            const access = await accesses_service_1.accessesService.getAccessByGlobalId(req.params.global_id);
            if (!access) {
                (0, response_1.sendError)(res, 'Access not found', 404);
                return;
            }
            await accesses_service_1.accessesService.deleteAccess(access.id);
            (0, response_1.sendSuccess)(res, null, 'Access deleted');
        }
        catch (error) {
            (0, response_1.sendError)(res, error.message, 500);
        }
    }
}
exports.AccessesController = AccessesController;
exports.accessesController = new AccessesController();
//# sourceMappingURL=accesses.controller.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteById = exports.getAll = exports.update = exports.getBySlugKey = exports.getByGlobalId = exports.getById = exports.create = void 0;
const base_service_1 = require("../services/base.service");
const response_1 = require("../utils/response");
const errorHandler_1 = require("../middlewares/errorHandler");
const M = base_service_1.baseService.prisma.settings;
const create = async (req, res, next) => {
    try {
        (0, response_1.sendSuccess)(res, await base_service_1.baseService.create(M, req.body), 'Setting created', 201);
    }
    catch (error) {
        next(error);
    }
};
exports.create = create;
const getById = async (req, res, next) => {
    try {
        const data = await base_service_1.baseService.findById(M, Number(req.params.id));
        if (!data)
            throw new errorHandler_1.AppError('Not found', 404);
        (0, response_1.sendSuccess)(res, data);
    }
    catch (error) {
        next(error);
    }
};
exports.getById = getById;
const getByGlobalId = async (req, res, next) => {
    try {
        const data = await base_service_1.baseService.findByGlobalId(M, req.params.global_id);
        if (!data)
            throw new errorHandler_1.AppError('Not found', 404);
        (0, response_1.sendSuccess)(res, data);
    }
    catch (error) {
        next(error);
    }
};
exports.getByGlobalId = getByGlobalId;
const getBySlugKey = async (req, res, next) => {
    try {
        const data = await base_service_1.baseService.findOne(M, { slug: req.params.slug, key: req.params.key });
        if (!data)
            throw new errorHandler_1.AppError('Not found', 404);
        (0, response_1.sendSuccess)(res, data);
    }
    catch (error) {
        next(error);
    }
};
exports.getBySlugKey = getBySlugKey;
const update = async (req, res, next) => {
    try {
        const setting = await base_service_1.baseService.findByGlobalId(M, req.params.global_id);
        if (!setting)
            throw new errorHandler_1.AppError('Not found', 404);
        (0, response_1.sendSuccess)(res, await base_service_1.baseService.update(M, setting.id, req.body));
    }
    catch (error) {
        next(error);
    }
};
exports.update = update;
const getAll = async (req, res, next) => {
    try {
        const { data, pagination } = await base_service_1.baseService.paginate(M, {
            page: Number(req.query.page),
            limit: Number(req.query.limit),
        });
        (0, response_1.sendSuccess)(res, data, undefined, 200, pagination);
    }
    catch (error) {
        next(error);
    }
};
exports.getAll = getAll;
const deleteById = async (req, res, next) => {
    try {
        const setting = await base_service_1.baseService.findByGlobalId(M, req.params.global_id);
        if (!setting)
            throw new errorHandler_1.AppError('Not found', 404);
        await base_service_1.baseService.delete(M, setting.id);
        (0, response_1.sendSuccess)(res, null);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteById = deleteById;
//# sourceMappingURL=settings.controller.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationRequest = exports.slugKeyRequest = exports.globalIdRequest = exports.idRequest = exports.updateRequest = exports.createRequest = void 0;
const uuid_1 = require("../utils/uuid");
const createRequest = (req, _res, next) => {
    req.body = {
        global_id: uuid_1.UuidUtil.generate(),
        slug: req.body.slug,
        key: req.body.key,
        value: req.body.value,
        description: req.body.description,
    };
    next();
};
exports.createRequest = createRequest;
const updateRequest = (req, _res, next) => {
    const data = {};
    if (req.body.slug !== undefined)
        data.slug = req.body.slug;
    if (req.body.key !== undefined)
        data.key = req.body.key;
    if (req.body.value !== undefined)
        data.value = req.body.value;
    if (req.body.description !== undefined)
        data.description = req.body.description;
    req.body = data;
    next();
};
exports.updateRequest = updateRequest;
const idRequest = (req, _res, next) => {
    req.params.id = req.params.id;
    next();
};
exports.idRequest = idRequest;
const globalIdRequest = (req, _res, next) => {
    req.params.global_id = req.params.global_id;
    next();
};
exports.globalIdRequest = globalIdRequest;
const slugKeyRequest = (req, _res, next) => {
    req.params.slug = req.params.slug;
    req.params.key = req.params.key;
    next();
};
exports.slugKeyRequest = slugKeyRequest;
const paginationRequest = (req, _res, next) => {
    req.query.page = req.query.page || '1';
    req.query.limit = req.query.limit || '10';
    next();
};
exports.paginationRequest = paginationRequest;
//# sourceMappingURL=settings.request.js.map
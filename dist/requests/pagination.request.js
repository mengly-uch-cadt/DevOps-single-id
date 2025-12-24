"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationRequest = void 0;
const paginationRequest = (req, _res, next) => {
    req.query.page = req.query.page || '1';
    req.query.limit = req.query.limit || '10';
    next();
};
exports.paginationRequest = paginationRequest;
//# sourceMappingURL=pagination.request.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = void 0;
const notFoundHandler = (req, res) => {
    res.status(404).json({ error: `Route ${req.method} ${req.path} not found` });
};
exports.notFoundHandler = notFoundHandler;
//# sourceMappingURL=notFound.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
    }
    catch (e) {
        res.status(400).json({ error: e.errors?.[0]?.message || 'Validation error' });
    }
};
exports.validate = validate;
//# sourceMappingURL=validate.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseService = exports.BaseService = void 0;
const client_1 = require("@prisma/client");
class BaseService {
    prisma;
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async create(model, data) {
        const now = new Date();
        // Always override created_at and updated_at with current date
        const { created_at, updated_at, ...rest } = data || {};
        try {
            return await model.create({
                data: {
                    ...rest,
                    created_at: now,
                    updated_at: now,
                }
            });
        }
        catch (error) {
            if (error.code === 'P2002') {
                // Prisma unique constraint violation
                throw new Error('Record already exists');
            }
            throw error;
        }
    }
    async findById(model, id) {
        return await model.findUnique({ where: { id } });
    }
    async findByGlobalId(model, global_id) {
        return await model.findUnique({ where: { global_id } });
    }
    async findOne(model, where, options) {
        return await model.findUnique({ where, ...options });
    }
    async findMany(model, options) {
        return await model.findMany(options);
    }
    async update(model, id, data) {
        return await model.update({
            where: { id },
            data: {
                ...data,
                updated_at: new Date(),
            }
        });
    }
    async delete(model, id) {
        await model.delete({ where: { id } });
    }
    async count(model, where) {
        return await model.count({ where });
    }
    async paginate(model, options, where, orderBy) {
        const { page, limit } = options;
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            model.findMany({
                where,
                skip,
                take: limit,
                orderBy: orderBy || { created_at: 'desc' },
            }),
            model.count({ where }),
        ]);
        return {
            data,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
}
exports.BaseService = BaseService;
exports.baseService = new BaseService();
//# sourceMappingURL=base.service.js.map
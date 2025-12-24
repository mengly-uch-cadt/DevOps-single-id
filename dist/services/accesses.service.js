"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessesService = exports.AccessesService = void 0;
exports.isAllowedOrigin = isAllowedOrigin;
const base_service_1 = require("./base.service");
const uuid_1 = require("uuid");
class AccessesService extends base_service_1.BaseService {
    async createAccess(data) {
        // Generate a random 250-character hexadecimal token
        const token = Array.from({ length: 250 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
        return await this.create(this.prisma.accesses, {
            global_id: (0, uuid_1.v4)(),
            allow_endpoint: data.allow_endpoint,
            token,
        });
    }
    async getAccessById(id) {
        return await this.findById(this.prisma.accesses, id);
    }
    async getAccessByGlobalId(global_id) {
        return await this.findByGlobalId(this.prisma.accesses, global_id);
    }
    async getAllAccesses(options) {
        if (options) {
            return await this.paginate(this.prisma.accesses, options);
        }
        return await this.findMany(this.prisma.accesses);
    }
    async updateAccess(id, data) {
        // Regenerate a random 250-character hexadecimal token on update
        const token = Array.from({ length: 250 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
        return await this.update(this.prisma.accesses, id, {
            ...data,
            token,
        });
    }
    async deleteAccess(id) {
        return await this.delete(this.prisma.accesses, id);
    }
    async getAccessByToken(token) {
        return await this.findOne(this.prisma.accesses, { token });
    }
    async validateBasicAuth(allow_endpoint, token) {
        const access = await this.findOne(this.prisma.accesses, {
            allow_endpoint,
            token,
        });
        return !!access;
    }
    async isAllowedOrigin(origin) {
        const access = await this.findOne(this.prisma.accesses, {
            allow_endpoint: origin,
        });
        return !!access;
    }
}
exports.AccessesService = AccessesService;
exports.accessesService = new AccessesService();
// Export standalone function for CORS
async function isAllowedOrigin(origin) {
    return exports.accessesService.isAllowedOrigin(origin);
}
//# sourceMappingURL=accesses.service.js.map
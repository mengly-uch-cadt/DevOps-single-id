"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersService = exports.UsersService = void 0;
const base_service_1 = require("./base.service");
const uuid_1 = require("uuid");
const notificationSync_service_1 = require("./notificationSync.service");
const crypto_1 = __importDefault(require("crypto"));
class UsersService extends base_service_1.BaseService {
    async createUser(data) {
        // Auto-generate hash if not provided
        const hash = data.hash || crypto_1.default.randomBytes(32).toString('hex');
        const user = await this.create(this.prisma.users, {
            global_id: (0, uuid_1.v4)(),
            name: data.name,
            hash,
        });
        // Sync to notification service in background (don't block on failure)
        notificationSync_service_1.notificationSyncService.syncUserToNotification({
            global_id: user.global_id,
            name: data.name,
            hash,
        }).catch(err => console.error('Background sync failed:', err));
        return user;
    }
    async getUserById(id) {
        return await this.findById(this.prisma.users, id);
    }
    async getUserByGlobalId(global_id) {
        return await this.findByGlobalId(this.prisma.users, global_id);
    }
    async getAllUsers(options) {
        if (options) {
            return await this.paginate(this.prisma.users, options, undefined, { created_at: 'desc' });
        }
        return await this.findMany(this.prisma.users, {
            orderBy: { created_at: 'desc' },
        });
    }
    async updateUser(id, data) {
        // Get user before update to get global_id
        const existingUser = await this.findById(this.prisma.users, id);
        const user = await this.update(this.prisma.users, id, data);
        // Sync to notification service in background
        if (existingUser) {
            notificationSync_service_1.notificationSyncService.updateUserInNotification(existingUser.global_id, data).catch(err => console.error('Background sync failed:', err));
        }
        return user;
    }
    async deleteUser(id) {
        // Get user before delete to get global_id
        const existingUser = await this.findById(this.prisma.users, id);
        const result = await this.delete(this.prisma.users, id);
        // Sync to notification service in background
        if (existingUser) {
            notificationSync_service_1.notificationSyncService.deleteUserFromNotification(existingUser.global_id).catch(err => console.error('Background sync failed:', err));
        }
        return result;
    }
    async getUserByUserId(global_id) {
        return await this.findOne(this.prisma.users, { global_id });
    }
    async getUserWithRelations(id) {
        return await this.findOne(this.prisma.users, { id }, {
            include: {
                admins: true,
                notifications: {
                    orderBy: { created_at: 'desc' },
                    take: 10,
                },
            },
        });
    }
}
exports.UsersService = UsersService;
exports.usersService = new UsersService();
//# sourceMappingURL=users.service.js.map
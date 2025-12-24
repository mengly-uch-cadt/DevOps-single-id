"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationsService = exports.NotificationsService = void 0;
const base_service_1 = require("./base.service");
const uuid_1 = require("uuid");
class NotificationsService extends base_service_1.BaseService {
    async updateNotificationByGlobalId(global_id, data) {
        return await this.prisma.notifications.update({
            where: { global_id },
            data: {
                ...data,
                updated_at: new Date(),
            },
        });
    }
    async createNotification(data) {
        // Find user by global_id
        const user = await this.prisma.users.findUnique({ where: { global_id: data.user_id } });
        if (!user)
            throw new Error('User not found');
        return await this.create(this.prisma.notifications, {
            global_id: (0, uuid_1.v4)(),
            user_id: user.id,
            title: data.title,
            body: data.body,
            status: data.status,
        });
    }
    async getNotificationById(id) {
        return await this.findById(this.prisma.notifications, id);
    }
    async getNotificationByGlobalId(global_id) {
        return await this.findByGlobalId(this.prisma.notifications, global_id);
    }
    async getAllNotifications(options) {
        if (options) {
            return await this.paginate(this.prisma.notifications, options, undefined, { created_at: 'desc' });
        }
        return await this.findMany(this.prisma.notifications, {
            include: { users: true },
            orderBy: { created_at: 'desc' },
        });
    }
    async updateNotification(id, data) {
        return await this.update(this.prisma.notifications, id, data);
    }
    async deleteNotification(id) {
        return await this.delete(this.prisma.notifications, id);
    }
    async getNotificationsByUserId(user_id, status) {
        const where = { user_id };
        if (status) {
            where.status = status;
        }
        return await this.findMany(this.prisma.notifications, {
            where,
            include: { users: true },
            orderBy: { created_at: 'desc' },
        });
    }
    async markAsRead(id) {
        return await this.update(this.prisma.notifications, id, { status: 'read' });
    }
    async markAsUnread(id) {
        return await this.update(this.prisma.notifications, id, { status: 'unread' });
    }
}
exports.NotificationsService = NotificationsService;
exports.notificationsService = new NotificationsService();
//# sourceMappingURL=notifications.service.js.map
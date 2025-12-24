"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationSyncService = exports.NotificationSyncService = void 0;
const base_service_1 = require("./base.service");
class NotificationSyncService extends base_service_1.BaseService {
    async getNotificationSettings() {
        const [urlSetting, tokenSetting, originSetting] = await Promise.all([
            this.prisma.settings.findFirst({
                where: { slug: 'notification_sys_url', key: 'notification_sys_url' },
            }),
            this.prisma.settings.findFirst({
                where: { slug: 'notification_sys_token', key: 'notification_sys_token' },
            }),
            this.prisma.settings.findFirst({
                where: { slug: 'notification_sys_origin', key: 'notification_sys_origin' },
            }),
        ]);
        if (!urlSetting || !tokenSetting || !originSetting) {
            console.error('Notification system settings not configured');
            return null;
        }
        return {
            url: urlSetting.value,
            token: tokenSetting.value,
            origin: originSetting.value,
        };
    }
    getBasicAuthHeader(origin, token) {
        return 'Basic ' + Buffer.from(`${origin}:${token}`).toString('base64');
    }
    async syncUserToNotification(data) {
        try {
            const settings = await this.getNotificationSettings();
            if (!settings) {
                console.log('Notification sync disabled - settings not configured');
                return false;
            }
            const response = await fetch(`${settings.url}/api/sys/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: this.getBasicAuthHeader(settings.origin, settings.token),
                },
                body: JSON.stringify({
                    user_id: data.global_id,
                    name: data.name,
                    hash: data.hash,
                }),
            });
            if (!response.ok) {
                console.error('Notification sync failed:', response.status, await response.text());
                return false;
            }
            const result = (await response.json());
            if (result.status !== 'success') {
                console.error('Notification sync returned error:', result.message);
                return false;
            }
            console.log('User synced to notification service:', data.global_id);
            return true;
        }
        catch (error) {
            console.error('Error syncing user to notification service:', error);
            return false;
        }
    }
    async updateUserInNotification(global_id, data) {
        try {
            const settings = await this.getNotificationSettings();
            if (!settings) {
                console.log('Notification sync disabled - settings not configured');
                return false;
            }
            const response = await fetch(`${settings.url}/api/sys/users/${global_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: this.getBasicAuthHeader(settings.origin, settings.token),
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                console.error('Notification update failed:', response.status);
                return false;
            }
            const result = (await response.json());
            if (result.status !== 'success') {
                console.error('Notification update returned error:', result.message);
                return false;
            }
            console.log('User updated in notification service:', global_id);
            return true;
        }
        catch (error) {
            console.error('Error updating user in notification service:', error);
            return false;
        }
    }
    async deleteUserFromNotification(global_id) {
        try {
            const settings = await this.getNotificationSettings();
            if (!settings) {
                console.log('Notification sync disabled - settings not configured');
                return false;
            }
            const response = await fetch(`${settings.url}/api/sys/users/${global_id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: this.getBasicAuthHeader(settings.origin, settings.token),
                },
            });
            if (!response.ok) {
                console.error('Notification delete failed:', response.status);
                return false;
            }
            const result = (await response.json());
            if (result.status !== 'success') {
                console.error('Notification delete returned error:', result.message);
                return false;
            }
            console.log('User deleted from notification service:', global_id);
            return true;
        }
        catch (error) {
            console.error('Error deleting user from notification service:', error);
            return false;
        }
    }
}
exports.NotificationSyncService = NotificationSyncService;
exports.notificationSyncService = new NotificationSyncService();
//# sourceMappingURL=notificationSync.service.js.map
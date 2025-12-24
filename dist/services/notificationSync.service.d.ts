import { BaseService } from './base.service';
export interface NotificationUser {
    global_id: string;
    user_id: string;
    name: string;
    hash: string;
}
export interface NotificationApiResponse<T = any> {
    status: string;
    message: string | null;
    data: T | null;
}
export declare class NotificationSyncService extends BaseService {
    private getNotificationSettings;
    private getBasicAuthHeader;
    syncUserToNotification(data: {
        global_id: string;
        name: string;
        hash: string;
    }): Promise<boolean>;
    updateUserInNotification(global_id: string, data: {
        name?: string;
        hash?: string;
    }): Promise<boolean>;
    deleteUserFromNotification(global_id: string): Promise<boolean>;
}
export declare const notificationSyncService: NotificationSyncService;
//# sourceMappingURL=notificationSync.service.d.ts.map
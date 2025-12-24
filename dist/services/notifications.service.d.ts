import { BaseService, PaginationOptions } from './base.service';
export declare class NotificationsService extends BaseService {
    updateNotificationByGlobalId(global_id: string, data: {
        title?: string;
        body?: string;
        status?: string;
    }): Promise<any>;
    createNotification(data: {
        user_id: string;
        title: string;
        body: string;
        status: string;
    }): Promise<unknown>;
    getNotificationById(id: number): Promise<unknown>;
    getNotificationByGlobalId(global_id: string): Promise<unknown>;
    getAllNotifications(options?: PaginationOptions): Promise<unknown[] | import("./base.service").PaginatedResult<any>>;
    updateNotification(id: number, data: {
        title?: string;
        body?: string;
        status?: string;
    }): Promise<unknown>;
    deleteNotification(id: number): Promise<void>;
    getNotificationsByUserId(user_id: number, status?: string): Promise<unknown[]>;
    markAsRead(id: number): Promise<unknown>;
    markAsUnread(id: number): Promise<unknown>;
}
export declare const notificationsService: NotificationsService;
//# sourceMappingURL=notifications.service.d.ts.map
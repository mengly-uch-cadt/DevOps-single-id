import { BaseService, PaginationOptions } from './base.service';
import { v4 as uuidv4 } from 'uuid';
import { notificationSyncService } from './notificationSync.service';
import crypto from 'crypto';

export class UsersService extends BaseService {
  async createUser(data: {
    name: string;
    hash?: string;
  }) {
    // Auto-generate hash if not provided
    const hash = data.hash || crypto.randomBytes(32).toString('hex');

    const user = await this.create(this.prisma.users, {
      global_id: uuidv4(),
      name: data.name,
      hash,
    });

    // Sync to notification service in background (don't block on failure)
    notificationSyncService.syncUserToNotification({
      global_id: (user as any).global_id,
      name: data.name,
      hash,
    }).catch(err => console.error('Background sync failed:', err));

    return user;
  }

  async getUserById(id: number) {
    return await this.findById(this.prisma.users, id);
  }

  async getUserByGlobalId(global_id: string) {
    return await this.findByGlobalId(this.prisma.users, global_id);
  }

  async getAllUsers(options?: PaginationOptions) {
    if (options) {
      return await this.paginate<any>(
        this.prisma.users,
        options,
        undefined,
        { created_at: 'desc' }
      );
    }
    return await this.findMany(this.prisma.users, {
      orderBy: { created_at: 'desc' },
    });
  }

  async updateUser(id: number, data: {
    name?: string;
    hash?: string;
  }) {
    // Get user before update to get global_id
    const existingUser = await this.findById(this.prisma.users, id);

    const user = await this.update(this.prisma.users, id, data);

    // Sync to notification service in background
    if (existingUser) {
      notificationSyncService.updateUserInNotification(
        (existingUser as any).global_id,
        data
      ).catch(err => console.error('Background sync failed:', err));
    }

    return user;
  }

  async deleteUser(id: number) {
    // Get user before delete to get global_id
    const existingUser = await this.findById(this.prisma.users, id);

    const result = await this.delete(this.prisma.users, id);

    // Sync to notification service in background
    if (existingUser) {
      notificationSyncService.deleteUserFromNotification(
        (existingUser as any).global_id
      ).catch(err => console.error('Background sync failed:', err));
    }

    return result;
  }

  async getUserByUserId(global_id: string) {
    return await this.findOne(this.prisma.users, { global_id });
  }

  async getUserWithRelations(id: number) {
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

export const usersService = new UsersService();

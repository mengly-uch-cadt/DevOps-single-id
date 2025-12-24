import { BaseService, PaginationOptions } from './base.service';
export declare class UsersService extends BaseService {
    createUser(data: {
        name: string;
        hash?: string;
    }): Promise<unknown>;
    getUserById(id: number): Promise<unknown>;
    getUserByGlobalId(global_id: string): Promise<unknown>;
    getAllUsers(options?: PaginationOptions): Promise<unknown[] | import("./base.service").PaginatedResult<any>>;
    updateUser(id: number, data: {
        name?: string;
        hash?: string;
    }): Promise<unknown>;
    deleteUser(id: number): Promise<void>;
    getUserByUserId(global_id: string): Promise<unknown>;
    getUserWithRelations(id: number): Promise<unknown>;
}
export declare const usersService: UsersService;
//# sourceMappingURL=users.service.d.ts.map
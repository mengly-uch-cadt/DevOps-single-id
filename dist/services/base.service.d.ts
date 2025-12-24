import { PrismaClient } from '@prisma/client';
export declare class BaseService {
    prisma: PrismaClient;
    constructor();
    create<T>(model: any, data: any): Promise<T>;
    findById<T>(model: any, id: number): Promise<T | null>;
    findByGlobalId<T>(model: any, global_id: string): Promise<T | null>;
    findOne<T>(model: any, where: any, options?: any): Promise<T | null>;
    findMany<T>(model: any, options?: any): Promise<T[]>;
    update<T>(model: any, id: number, data: any): Promise<T>;
    delete(model: any, id: number): Promise<void>;
    count(model: any, where?: any): Promise<number>;
    paginate<T>(model: any, options: PaginationOptions, where?: any, orderBy?: any): Promise<PaginatedResult<T>>;
}
export declare const baseService: BaseService;
export interface PaginationOptions {
    page: number;
    limit: number;
}
export interface PaginatedResult<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}
//# sourceMappingURL=base.service.d.ts.map
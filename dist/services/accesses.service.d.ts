import { BaseService, PaginationOptions } from './base.service';
export declare class AccessesService extends BaseService {
    createAccess(data: {
        allow_endpoint: string;
    }): Promise<unknown>;
    getAccessById(id: number): Promise<unknown>;
    getAccessByGlobalId(global_id: string): Promise<unknown>;
    getAllAccesses(options?: PaginationOptions): Promise<unknown[] | import("./base.service").PaginatedResult<any>>;
    updateAccess(id: number, data: {
        allow_endpoint?: string;
    }): Promise<unknown>;
    deleteAccess(id: number): Promise<void>;
    getAccessByToken(token: string): Promise<unknown>;
    validateBasicAuth(allow_endpoint: string, token: string): Promise<boolean>;
    isAllowedOrigin(origin: string): Promise<boolean>;
}
export declare const accessesService: AccessesService;
export declare function isAllowedOrigin(origin: string): Promise<boolean>;
//# sourceMappingURL=accesses.service.d.ts.map
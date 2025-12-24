import { BaseService } from './base.service';
export interface DecodedExternalToken {
    user_id: string;
    hash: string;
    [key: string]: any;
}
export interface JWTPayload {
    user_id: string;
    hash: string;
    name: string;
}
export declare class AuthService extends BaseService {
    login(user_id: string, hash: string): Promise<{
        token: string;
        user: any;
    } | null>;
    verifyToken(token: string): JWTPayload | null;
}
export declare const authService: AuthService;
//# sourceMappingURL=auth.service.d.ts.map
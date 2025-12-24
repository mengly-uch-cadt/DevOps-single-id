import { Response } from 'express';
export interface SuccessResponse<T = any> {
    status: 'success';
    message: string | null;
    data: T | null;
    meta?: any;
}
export interface ErrorResponse {
    status: 'error';
    message: string | null;
    data: null;
}
/**
 * Send success response
 * @param res - Express Response object
 * @param data - Response data (can be null)
 * @param message - Success message (optional)
 * @param status - HTTP status code (default: 200)
 * @param meta - Additional metadata like pagination (optional)
 */
export declare function sendSuccess<T = unknown>(res: Response, data?: T | null, message?: string | null, status?: number, meta?: any): Response;
/**
 * Send error response
 * @param res - Express Response object
 * @param message - Error message (optional)
 * @param status - HTTP status code (default: 400)
 */
export declare function sendError(res: Response, message?: string | null, status?: number): Response;
declare const _default: {
    sendSuccess: typeof sendSuccess;
    sendError: typeof sendError;
};
export default _default;
//# sourceMappingURL=response.d.ts.map
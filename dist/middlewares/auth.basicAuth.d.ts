import { Request, Response, NextFunction } from 'express';
/**
 * Basic Auth middleware that validates access using allow_endpoint (username) and token (password)
 * from the accesses table
 */
export declare const authenticateBasicAuth: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=auth.basicAuth.d.ts.map
import { Request, Response, NextFunction } from 'express';
import { JWTPayload } from '../services/auth.service';
declare global {
    namespace Express {
        interface Request {
            user?: JWTPayload;
        }
    }
}
export declare const authenticateJWT: (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.jwt.d.ts.map
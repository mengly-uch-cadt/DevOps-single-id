import { Request, Response } from 'express';
export declare class AccessesController {
    create(req: Request, res: Response): Promise<void>;
    getAll(req: Request, res: Response): Promise<void>;
    getById(req: Request, res: Response): Promise<void>;
    update(req: Request, res: Response): Promise<void>;
    delete(req: Request, res: Response): Promise<void>;
}
export declare const accessesController: AccessesController;
//# sourceMappingURL=accesses.controller.d.ts.map
import { Request, Response } from 'express';
import { authService } from '../services/auth.service';
import { sendSuccess, sendError } from '../utils/response';

export class AuthController {
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { user_id, hash } = req.body;
      const result = await authService.login(user_id, hash);

      if (!result) {
        sendError(res, 'Invalid credentials', 401);
        return;
      }

      sendSuccess(res, result);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Internal server error';
      sendError(res, message, 500);
    }
  }

  async ssoLogin(req: Request, res: Response): Promise<void> {
    try {
      const { user_id, hash } = req.body;
      const result = await authService.login(user_id, hash);

      if (!result) {
        sendError(res, 'Invalid credentials', 401);
        return;
      }

      sendSuccess(res, result);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Internal server error';
      sendError(res, message, 500);
    }
  }
}

export const authController = new AuthController();

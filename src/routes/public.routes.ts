import { Router, Request, Response } from 'express';
import { sendSuccess } from '../utils/response';
import { usersController } from '../controllers/users.controller';
import { validate } from '../middlewares/validate';
import { createUserRequest } from '../requests/users.request';
import { authController } from '../controllers/auth.controller';
import { loginRequest } from '../requests/auth.request';
import { authenticateBasicAuth } from '../middlewares/auth.basicAuth';

const router = Router();

// Health check endpoint
router.get('/health', (_req: Request, res: Response) => {
  sendSuccess(
    res,
    {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    },
    'Service is healthy'
  );
});

// Public user registration (syncs to notification service)
router.post('/register', validate(createUserRequest), usersController.create);

// SSO login endpoint for notification system
router.post('/auth/sso/login', authenticateBasicAuth, validate(loginRequest), authController.ssoLogin);

export default router;

import { Router, Request, Response } from 'express';
import { sendSuccess } from '../utils/response';
import { usersController } from '../controllers/users.controller';
import { validate } from '../middlewares/validate';
import { createUserRequest } from '../requests/users.request';

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

export default router;

import { Router } from 'express';
import * as controller from '../controllers/auth.controller';
import { validate } from '../middlewares/validate';
import { loginSchema } from '../schemas/auth.schema';
import { authenticateUserJwt } from '../middlewares/auth.userJwt';

const router = Router();

router.post('/login', validate(loginSchema), controller.login);
router.get('/me', authenticateUserJwt, controller.me);

export default router;

import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { validate } from '../middlewares/validate';
import { loginRequest, ssoLoginRequest } from '../requests/auth.request';

const router = Router();

router.post('/login', validate(loginRequest), authController.login);
router.post('/sso', validate(ssoLoginRequest), authController.ssoLogin);

export default router;

import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { validate } from '../middlewares/validate';
import { loginRequest } from '../requests/auth.request';
import { authenticateBasicAuth } from '../middlewares/auth.basicAuth';

const router = Router();


// Login endpoint requires Basic Auth (allow_endpoint:token)
router.post('/login', authenticateBasicAuth, validate(loginRequest), authController.login);

// SSO Login endpoint is public (no basic auth)
import { ssoLoginRequest } from '../requests/auth.request';
router.post('/sso/login', validate(ssoLoginRequest), authController.ssoLogin);

export default router;

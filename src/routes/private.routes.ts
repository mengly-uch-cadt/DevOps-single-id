import { Router } from 'express';
import usersRoutes from './users.routes';

const router = Router();

router.use('/sid/users', usersRoutes);

export default router;

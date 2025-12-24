import { Router } from 'express';
import usersRoutes from './users.routes';
import accessesRoutes from './accesses.routes';
import authRoutes from './auth.routes';

const router = Router();

router.use('/sid/users', usersRoutes);
router.use('/sid/accesses', accessesRoutes);
router.use('/sid', authRoutes);

export default router;

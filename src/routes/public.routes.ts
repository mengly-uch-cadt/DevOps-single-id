import { Router } from 'express';
import authRoutes from './auth.routes';
import accessesRoutes from './accesses.routes';

const router = Router();

router.use('/sid', authRoutes);
router.use('/sid/accesses', accessesRoutes);

export default router;

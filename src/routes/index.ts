import { Router } from 'express';
import publicRoutes from './public.routes';
import privateRoutes from './private.routes';
import sysRoutes from './sys.routes';

const router = Router();

console.log('📍 Mounting routes...');
console.log('Public routes:', publicRoutes.stack?.map((r: any) => r.route?.path));

// Mount public, private, and system route groups
router.use('/public', publicRoutes);
router.use('/private', privateRoutes);
router.use('/sys', sysRoutes);

console.log('✅ Routes mounted successfully');

export default router;

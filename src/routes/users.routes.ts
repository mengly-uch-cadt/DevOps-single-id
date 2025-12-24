import { Router } from 'express';
import * as controller from '../controllers/users.controller';
import * as request from '../requests/users.request';
import { validate } from '../middlewares/validate';
import {
  createUserSchema,
  updateUserSchema,
  globalIdParamsSchema,
} from '../schemas/users.schema';
import { authenticateServiceToken } from '../middlewares/auth.serviceToken';

const router = Router();

router.use(authenticateServiceToken);

router.post('/', validate(createUserSchema), request.createRequest, controller.create);
router.get('/', controller.getAll);
router.get('/:global_id', validate(globalIdParamsSchema), request.globalIdRequest, controller.getByGlobalId);
router.put('/:global_id', validate(updateUserSchema), request.updateRequest, controller.update);
router.delete('/:global_id', validate(globalIdParamsSchema), request.globalIdRequest, controller.deleteByGlobalId);

export default router;

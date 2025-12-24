import { Router } from 'express';
import * as controller from '../controllers/accesses.controller';
import { validate } from '../middlewares/validate';
import { createAccessSchema, validateAccessSchema } from '../schemas/accesses.schema';

const router = Router();

router.post('/', validate(createAccessSchema), controller.create);
router.post('/validate', validate(validateAccessSchema), controller.validate);

export default router;

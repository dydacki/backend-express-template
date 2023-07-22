import { Router } from 'express';
import { createUser } from '../controllers/userController';
import { validateResource } from '../middleware/validationHandler';
import { createUserSchema } from '../schemas/userSchemas';

const router = Router();
router.post('/', validateResource(createUserSchema), createUser);

export default router;

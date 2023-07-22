import { Router } from 'express';
import { createUser } from '../controllers/userController';
import { validateResource } from '../middleware/validationHandler';
import { signInUserSchema } from '../schemas/userSchemas';

const router = Router();
router.post('/', validateResource(signInUserSchema), createUser);

export default router;

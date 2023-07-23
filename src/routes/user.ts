import { Router } from 'express';
import { createUser, verifyUser } from '../controllers/userController';
import { validateBodyResource, validateParamsResource } from '../middleware/validationHandler';
import { createUserSchema, verifyUserSchema } from '../schemas/userSchemas';

const router = Router();
router.post('/', validateBodyResource(createUserSchema), createUser);
router.post('/verify/', validateParamsResource(verifyUserSchema), verifyUser);
export default router;

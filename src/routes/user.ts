import { Router } from 'express';
import { createUser, requestPasswordReset, verifyUser } from '../controllers/userController';
import { validateBodyResource, validateParamsResource } from '../middleware/validationHandler';
import { createUserSchema, verifyUserSchema, requestPasswordResetSchema } from '../schemas/userSchemas';

const router = Router();
router.post('/', validateBodyResource(createUserSchema), createUser);
router.post('/verify/', validateParamsResource(verifyUserSchema), verifyUser);
router.post('/request-password-reset/', validateBodyResource(requestPasswordResetSchema), requestPasswordReset);
export default router;

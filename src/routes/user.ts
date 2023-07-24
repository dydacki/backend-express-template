import { Router } from 'express';
import { createUser, requestPasswordReset, resetPassword, verifyUser } from '../controllers/userController';
import { validateBodyResource, validateQueryResource } from '../middleware/validationHandler';
import { createUserSchema, verifyUserSchema, requestPasswordResetSchema, resetPasswordSchema } from '../schemas/userSchemas';

const router = Router();
router.post('/', validateBodyResource(createUserSchema), createUser);
router.post('/verify/', validateQueryResource(verifyUserSchema), verifyUser);
router.post('/request-password-reset/', validateBodyResource(requestPasswordResetSchema), requestPasswordReset);
router.post('/reset-password/', validateQueryResource(resetPasswordSchema), resetPassword);
export default router;

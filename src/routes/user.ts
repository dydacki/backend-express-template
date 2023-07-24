import { Router } from 'express';
import { createUser, requestPasswordReset, resetPassword, verifyUser } from '../controllers/userController';
import { validateBodyResource, validateQueryResource, validateResource } from '../middleware/validationHandler';
import { createUserSchema, verifyUserSchema, requestPasswordResetSchema, resetPasswordQuerySchema, resetPasswordBodySchema } from '../schemas/userSchemas';

const router = Router();
router.post('/', validateBodyResource(createUserSchema), createUser);
router.post('/verify/', validateQueryResource(verifyUserSchema), verifyUser);
router.post('/request-password-reset/', validateBodyResource(requestPasswordResetSchema), requestPasswordReset);
router.post('/reset-password/', validateResource(resetPasswordQuerySchema, resetPasswordBodySchema), resetPassword);
export default router;

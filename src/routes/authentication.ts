import { Router } from 'express';
import { login, refreshToken } from '../controllers/authenticationController';
import { validateBodyResource } from '../middleware/validationHandler';
import { createSessionSchema } from '../schemas/sessionSchema';

const router = Router();
router.post('/login', validateBodyResource(createSessionSchema), login);
router.post('/refresh', refreshToken);
export default router;

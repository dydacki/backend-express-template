import { Request, Response, Router } from 'express';

const router = Router();
router.get('/', (_: Request, response: Response) => response.status(200).json({ message: 'pong' }));

export default router;

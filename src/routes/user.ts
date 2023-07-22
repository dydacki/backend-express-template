import { Request, Response, Router } from 'express';

const router = Router();
router.post('/', (request: Request, response: Response) => response.status(200).json({ message: 'OK' }));

export default router;

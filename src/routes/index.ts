import { Request, Response, Router } from 'express';

const router = Router();
router.get('/ping', (_: Request, response: Response) => response.status(200).json({ message: 'pong' }));

export = router;

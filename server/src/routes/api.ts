import { Router, Request, Response } from 'express';

const router = Router();

// Define the /api/v1 route
router.get('/v1', (req: Request, res: Response) => {
  res.send('Welcome to Digital Twins');
});

export default router;
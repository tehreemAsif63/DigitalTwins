import { Router } from 'express';
import { welcomeMessage } from '../controllers/apiController';

const router = Router();

// Define the /api/v1 route
router.get('/v1', welcomeMessage);

export default router;
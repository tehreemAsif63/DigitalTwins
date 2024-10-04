import { Router } from 'express';
import { welcomeMessage } from '../controllers/apiController';

const router = Router();

// Define the /api/v1 route
router.get('/', welcomeMessage);

export default router;
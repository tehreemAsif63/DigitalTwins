import { Router } from 'express';
import { sendDecodedData } from '../controllers/SendDataController';

const router = Router();

// Define the /api/v1/send-data route
router.get('/v1/send-data', sendDecodedData);

export default router;
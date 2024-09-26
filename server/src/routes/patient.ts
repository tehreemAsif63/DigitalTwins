import { Router } from 'express';
import { sendPatientData } from '../controllers/patientController';

const router = Router();

// Define the send patient data route
router.get('/v1/patients/:id/data', sendPatientData);

export default router;
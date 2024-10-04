import { Router } from 'express';
import { sendPatientData, sendPatientCategoryData } from '../controllers/patientController';

const router = Router();

// Define the route of sending patient data(all categories) by patient id
router.get('/:id/data', sendPatientData);

// Define the route of sending patient category data by patient id
router.get('/:id/data/:category', sendPatientCategoryData);

export default router;
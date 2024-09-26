import { Request, Response } from 'express';
import { deCodedData } from '../services/fakeDataService';

// Controller for sending decoded data
export const sendDecodedData = async (req: Request, res: Response) => {
  try {
    const decodedData = await deCodedData();
    res.json({ success: true, data: decodedData });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error sending data' });
  }
};
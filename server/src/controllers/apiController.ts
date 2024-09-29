import { Request, Response } from 'express';

// Controller for the /api/v1 route
export const welcomeMessage = (req: Request, res: Response) => {
  try {
    res.send('Welcome to Codeiologist');
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error sending data' });
  }
  
};
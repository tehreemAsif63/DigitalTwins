import { Request, Response, NextFunction } from 'express';

// Handle 404 errors
export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).send('Not found');
};
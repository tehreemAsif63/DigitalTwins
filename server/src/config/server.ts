import express from 'express';
import morgan from 'morgan';
import apiRoutes from '../routes/api';
import { notFoundHandler } from '../middlewares/errorHandler';

const app = express();

// Apply middlewares
app.use(morgan('dev'));
app.use(express.json());

// Apply routes
app.use('/api', apiRoutes);

// Apply error handler
app.use(notFoundHandler);

export default app;
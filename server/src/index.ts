import express from 'express';
import morgan from 'morgan';
import apiRoutes from './routes/api';
import sendDecodedDataRoutes from './routes/sendDecodedData';
import { notFoundHandler } from './middlewares/errorHandler';

const app = express();
const port = process.env.PORT || 5000;

// Apply middlewares
app.use(morgan('dev'));
app.use(express.json());

// Apply routes
app.use('/api', apiRoutes);
app.use('/api', sendDecodedDataRoutes);

// Apply error handler
app.use(notFoundHandler);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
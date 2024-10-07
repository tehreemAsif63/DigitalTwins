import fs from 'fs';
import express from 'express';
import morgan from 'morgan';
import apiRoutes from './routes/api';
import patientRoutes from './routes/patient';
import { notFoundHandler } from './middlewares/errorHandler';
import cors from 'cors';

// Initialize express application
const app = express();
const port = process.env.PORT || 5000;

// Apply middlewares
app.use(cors({
    origin: 'http://localhost:5173', 
}));
app.use(morgan('dev'));
app.use(express.json());

// Apply routes
app.use('/api/v1', apiRoutes);
app.use('/api/v1/patients', patientRoutes);

// Apply error handler
app.use(notFoundHandler);

// Start HTTP server instead of HTTPS
app.listen(port, () => {
    console.log(`HTTP Server running on port ${port}`);
});
// Start HTTPS server
//https.createServer(sslOptions, app).listen(port, () => {
  //  console.log(`HTTPS Server running on port ${port}`);
//});
import https from 'https';
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
    origin: 'http://localhost:3000', 
}));
app.use(morgan('dev'));
app.use(express.json());

// Apply routes
app.use('/api/v1', apiRoutes);
app.use('/api/v1/patients', patientRoutes);

// Apply error handler
app.use(notFoundHandler);

// Read SSL certificate and key files
const sslOptions = {
    key: fs.readFileSync('./certs/server.key'),
    cert: fs.readFileSync('./certs/server.cert'),
};

// Start HTTPS server
https.createServer(sslOptions, app).listen(port, () => {
    console.log(`HTTPS Server running on port ${port}`);
});
import https from 'https';
import fs from 'fs';
import express from 'express';
import morgan from 'morgan';
import apiRoutes from './routes/api';
import sendDecodedDataRoutes from './routes/sendDecodedData';
import { notFoundHandler } from './middlewares/errorHandler';

// Initialize express application
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

// Read SSL certificate and key files
const sslOptions = {
    key: fs.readFileSync('./certs/server.key'),
    cert: fs.readFileSync('./certs/server.cert'),
};

// Start HTTPS server
https.createServer(sslOptions, app).listen(port, () => {
    console.log(`HTTPS Server running on port ${port}`);
});
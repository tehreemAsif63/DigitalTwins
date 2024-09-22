const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Allows cross-domain requests from the React frontend
app.use(cors());

// Defining API Routes
app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from Digital Twins server!' });
});

// Startup server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
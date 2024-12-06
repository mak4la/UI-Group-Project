import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bookRoutes from './api/bookRoutes.js';

// Load environment variables from the .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/books', bookRoutes);

// Routes
app.get('/', (req, res) => {
  res.send('Backend is running on Node.js with dotenv!');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  res.status(500).send('Something went wrong!');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
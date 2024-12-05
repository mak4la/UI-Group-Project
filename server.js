import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import {getUserLists, createList} from './server/Database.js'

/*const express = require('express'); 
const dotenv = require('dotenv');
const cors = require('cors'); */


// Load environment variables from the .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Backend is running on Node.js with dotenv!');
});

app.get('/back/lists/:userId', async (req, res) => {
  try {
    const result = await getUserLists(req.params.userId)
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

app.post('/back/lists/add', async (req, res) => {
  try {
    console.log(req.body)
    const [name, id] = req.body.data
    await createList(id, name)
    res.json({"message":"Form Submitted"})
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  res.status(500).send('Something went wrong!');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

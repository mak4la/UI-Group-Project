import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import {getUserLists, createList} from './server/Database.js'
import { createUser } from './server/Database.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST'],     
  credentials: true              
}));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Backend is running on Node.js with dotenv!');
});

app.post('/back/register', async (req, res) => {
  try {
    const { username, password, email, firstName, lastName } = req.body;

    // Hash the password before saving it to the database (use bcrypt)
    const bcrypt = await import('bcrypt');
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Call the createUser function to save the user in the database
    const result = await createUser(username, passwordHash, email, firstName, lastName);

    res.status(201).json({ message: 'User registered successfully', result });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// - Get user's lists
app.get('/back/lists/:userId', async (req, res) => {
  try {
    const result = await getUserLists(req.params.userId)
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

// - Create List in Database
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

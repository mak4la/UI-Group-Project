import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bookRoutes from './api/bookRoutes.js';
import {getUserLists, createList, createUser, deleteList} from './Database.js'; 


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;


app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS', 'PATCH', 'PUT'],
  credentials: true              
}));

app.use(express.json());

// Book Routes
app.use('/api/books', bookRoutes);

// Basic Route 
app.get('/', (req, res) => {
  res.send('Backend is running on Node.js with dotenv!');
});

// Auth Routes
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

// List Routes
app.get('/back/lists/:userId', async (req, res) => {
  try {
    const result = await getUserLists(req.params.userId)
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/back/lists/add', async (req, res) => {
  try {
    console.log(req.body)
    const [name, id] = req.body.data
    await createList(id, name)
    res.json({"message":"Form Submitted"})
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/back/lists/:listId', async (req, res) => {
  try {
      console.log('Delete request received for listId:', req.params.listId);
      const result = await deleteList(req.params.listId);
      console.log('Delete result:', result);
      res.json({ message: 'List deleted successfully' });
  } catch (error) {
      console.error('Server error deleting list:', error);
      res.status(500).json({ error: error.message });
  }
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
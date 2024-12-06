// bookRoutes.js
import express from 'express';
import { searchBooks, getBookById } from './googleBooksService.js';
import { getBestSellers } from './nytService.js';
import { 
    getReviewsForBook, 
    createReview, 
    addBookToList,
    getListBooks,
    createNote,
    getNotesForBook,
    getUserLists     
} from '../Database.js';

const router = express.Router();

// Get books in a list
router.get('/list/:listId', async (req, res) => {
    try {
        console.log('Fetching books for list:', req.params.listId);
        const books = await getListBooks(req.params.listId);
        res.json(books);
    } catch (error) {
        console.error('Error getting list books:', error);
        res.status(500).json({ error: error.message });
    }
});

// Add book to list
router.post('/list/add', async (req, res) => {
    try {
        console.log('Received request body:', req.body);
        const { list_id, google_book_id } = req.body;
        
        if (!list_id || !google_book_id) {
            throw new Error('Missing required fields: list_id or google_book_id');
        }

        const result = await addBookToList(list_id, google_book_id);
        res.json({ message: 'Book added to list successfully', result });
    } catch (error) {
        console.error('Add to list error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Search books
router.get('/search', async (req, res) => {
    try {
        const { q } = req.query;
        const books = await searchBooks(q);
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get bestsellers
router.get('/bestsellers', async (req, res) => {
    try {
        const books = await getBestSellers();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get book details with reviews
router.get('/:googleBookId', async (req, res) => {
    try {
        const [bookDetails, reviews] = await Promise.all([
            getBookById(req.params.googleBookId),
            getReviewsForBook(req.params.googleBookId)
        ]);
        res.json({ ...bookDetails, reviews });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add review
router.post('/:googleBookId/reviews', async (req, res) => {
    try {
        const { userId, rating, reviewText } = req.body;
        await createReview(req.params.googleBookId, userId, rating, reviewText);
        res.json({ message: 'Review added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add note
router.post('/:googleBookId/notes', async (req, res) => {
    try {
        const { userId, noteText } = req.body;
        await createNote(req.params.googleBookId, userId, noteText);
        res.json({ message: 'Note added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
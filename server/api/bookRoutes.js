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

// Debug logs for lists
router.get('/lists/:userId', async (req, res) => {
    try {
        console.log(`Fetching lists for user: ${req.params.userId}`);
        const lists = await getUserLists(req.params.userId);
        console.log('Lists fetched:', lists);
        res.json(lists);
    } catch (error) {
        console.error('Error getting lists:', error);
        res.status(500).json({ error: error.message });
    }
});

// Search books
router.get('/search', async (req, res) => {
    try {
        console.log('Search request received with query:', req.query.q);
        const { q } = req.query;
        const books = await searchBooks(q);
        console.log(`Found ${books.length} books for query: ${q}`);
        res.json(books);
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Get bestsellers
router.get('/bestsellers', async (req, res) => {
    try {
        console.log('Fetching bestsellers');
        const books = await getBestSellers();
        console.log(`Retrieved ${books.length} bestsellers`);
        res.json(books);
    } catch (error) {
        console.error('Bestsellers error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Get book details with reviews
router.get('/:googleBookId', async (req, res) => {
    try {
        console.log(`Fetching details for book: ${req.params.googleBookId}`);
        const [bookDetails, reviews] = await Promise.all([
            getBookById(req.params.googleBookId),
            getReviewsForBook(req.params.googleBookId)
        ]);
        res.json({ ...bookDetails, reviews });
    } catch (error) {
        console.error('Book details error:', error);
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
        console.error('Review creation error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Add book to list
router.post('/list/add', async (req, res) => {
    try {
        const { listId, googleBookId } = req.body;
        await addBookToList(listId, googleBookId);
        res.json({ message: 'Book added to list successfully' });
    } catch (error) {
        console.error('Add to list error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Add note to book
router.post('/:googleBookId/notes', async (req, res) => {
    try {
        const { userId, noteText } = req.body;
        await createNote(req.params.googleBookId, userId, noteText);
        res.json({ message: 'Note added successfully' });
    } catch (error) {
        console.error('Note creation error:', error);
        res.status(500).json({ error: error.message });
    }
});

export default router;
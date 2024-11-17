import express from 'express';
import { searchBooks, getBookById } from './googleBooksService.js';
import { getBestSellers } from './nytService.js';
import { 
    getReviewsForBook, 
    createReview, 
    addBookToList,
    getListBooks,
    createNote,
    getNotesForBook 
} from '../Database.js';

const router = express.Router();

// search books
router.get('/search', async (req, res) => {
    try {
        const { q } = req.query;
        const books = await searchBooks(q);
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// get bestsellers
router.get('/bestsellers', async (req, res) => {
    try {
        const books = await getBestSellers();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// get book details with reviews
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

// add review
router.post('/:googleBookId/reviews', async (req, res) => {
    try {
        const { userId, rating, reviewText } = req.body;
        await createReview(req.params.googleBookId, userId, rating, reviewText);
        res.json({ message: 'Review added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// add book to list
router.post('/list/:listId/add', async (req, res) => {
    try {
        const { googleBookId } = req.body;
        await addBookToList(req.params.listId, googleBookId);
        res.json({ message: 'Book added to list successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// add note to book
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
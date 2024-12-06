import axios from 'axios';
import dotenv from 'dotenv';
import NodeCache from 'node-cache';


dotenv.config();


const searchCache = new NodeCache({ stdTTL: 3600 });


const googleBooks = axios.create({
    baseURL: 'https://www.googleapis.com/books/v1',
    params: {
        key: process.env.GOOGLE_BOOKS_API_KEY
    }
});

// need to implement caching, rate limit reached 
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS = 10; // 10 requests per minute
const searchLimiter = {};

export async function searchBooks(query) {
    try {
        
        const cacheKey = `search:${query}`;
        const cachedResults = searchCache.get(cacheKey);
        if (cachedResults) {
            console.log('Returning cached results for:', query);
            return cachedResults;
        }

        
        const now = Date.now();
        if (!searchLimiter[query]) {
            searchLimiter[query] = {
                count: 0,
                resetTime: now + RATE_LIMIT_WINDOW
            };
        }

        if (now > searchLimiter[query].resetTime) {
            searchLimiter[query] = {
                count: 0,
                resetTime: now + RATE_LIMIT_WINDOW
            };
        }

        if (searchLimiter[query].count >= MAX_REQUESTS) {
            throw new Error('Rate limit exceeded. Please try again later.');
        }

        searchLimiter[query].count++;

        console.log('Making request to Google Books API with query:', query);
        const response = await googleBooks.get('/volumes', {
            params: {
                q: query,
                maxResults: 20
            }
        });

        if (!response.data.items) {
            console.log('No results found for query:', query);
            return [];
        }

        const formattedBooks = response.data.items.map(book => ({
            google_book_id: book.id,
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors,
            description: book.volumeInfo.description,
            thumbnail: book.volumeInfo.imageLinks?.thumbnail,
            previewLink: book.volumeInfo.previewLink,
            publishedDate: book.volumeInfo.publishedDate,
            pageCount: book.volumeInfo.pageCount
        }));

        
        searchCache.set(cacheKey, formattedBooks);
        console.log(`Cached ${formattedBooks.length} results for query:`, query);

        return formattedBooks;
    } catch (error) {
        console.error('Google Books API Error:', error);
        throw new Error(`Failed to search books: ${error.message}`);
    }
}

export async function getBookById(googleBookId) {
    try {
        const response = await googleBooks.get(`/volumes/${googleBookId}`);
        const book = response.data;
        return {
            google_book_id: book.id,
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors,
            description: book.volumeInfo.description,
            thumbnail: book.volumeInfo.imageLinks?.thumbnail,
            previewLink: book.volumeInfo.previewLink,
            publishedDate: book.volumeInfo.publishedDate,
            pageCount: book.volumeInfo.pageCount
        };
    } catch (error) {
        console.error('Google Books API Error:', error);
        throw error;
    }
}

export default googleBooks;
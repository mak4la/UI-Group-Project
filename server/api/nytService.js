import axios from 'axios';
import dotenv from 'dotenv';
import { getBookById } from './googleBooksService.js';
dotenv.config();

const nytBooks = axios.create({
    baseURL: 'https://api.nytimes.com/svc/books/v3',
    params: {
        'api-key': process.env.NYT_API_KEY
    }
});

export async function getBestSellers() {
    try {
        const response = await nytBooks.get('/lists/current/hardcover-fiction.json');
        
        // NYT data wokking with Google Books details
        const books = await Promise.all(
            response.data.results.books.map(async (book) => {
                try {
                    // Search Google Books using ISBN
                    const googleBooks = await axios.get(`https://www.googleapis.com/books/v1/volumes`, {
                        params: {
                            q: `isbn:${book.primary_isbn13}`,
                            key: process.env.GOOGLE_BOOKS_API_KEY
                        }
                    });

                    const googleBook = googleBooks.data.items?.[0];
                    return {
                        google_book_id: googleBook?.id,
                        title: book.title,
                        author: book.author,
                        description: book.description,
                        rank: book.rank,
                        isbn13: book.primary_isbn13,
                        weeksOnList: book.weeks_on_list,
                        thumbnail: googleBook?.volumeInfo?.imageLinks?.thumbnail,
                        previewLink: googleBook?.volumeInfo?.previewLink
                    };
                } catch (error) {
                    console.error(`Error fetching Google Books data for ${book.title}:`, error);
                    return null;
                }
            })
        );

        return books.filter(book => book !== null);
    } catch (error) {
        console.error('NYT API Error:', error);
        throw error;
    }
}
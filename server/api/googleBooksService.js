import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const googleBooks = axios.create({
    baseURL: 'https://www.googleapis.com/books/v1',
    params: {
        key: process.env.GOOGLE_BOOKS_API_KEY
    }
});

export async function searchBooks(query) {
    try {
        const response = await googleBooks.get('/volumes', {
            params: {
                q: query,
                maxResults: 20
            }
        });
        return response.data.items.map(book => ({
            google_book_id: book.id,
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors,
            description: book.volumeInfo.description,
            thumbnail: book.volumeInfo.imageLinks?.thumbnail,
            previewLink: book.volumeInfo.previewLink,
            publishedDate: book.volumeInfo.publishedDate,
            pageCount: book.volumeInfo.pageCount
        }));
    } catch (error) {
        console.error('Google Books API Error:', error);
        throw error;
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
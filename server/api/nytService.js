import axios from 'axios';
import dotenv from 'dotenv';
import NodeCache from 'node-cache';


dotenv.config();


const bestsellersCache = new NodeCache({ stdTTL: 3600 }); // one horu cache


const nytApi = axios.create({
    baseURL: 'https://api.nytimes.com/svc/books/v3',
    params: {
        'api-key': process.env.NYT_API_KEY
    }
});

export async function getBestSellers() {
    try {
        
        const cacheKey = 'bestsellers';
        const cachedResults = bestsellersCache.get(cacheKey);
        if (cachedResults) {
            console.log('Returning cached bestsellers');
            return cachedResults;
        }

        console.log('Fetching NYT bestsellers...');
        const response = await nytApi.get('/lists/current/hardcover-fiction.json');
        
        if (!response.data?.results?.books) {
            console.error('Invalid NYT response structure:', response.data);
            return [];
        }

        console.log(`Found ${response.data.results.books.length} NYT bestsellers`);

        // avoid rate limits
        const books = [];
        const batchSize = 5;
        const nytBooksList = response.data.results.books; 

        for (let i = 0; i < nytBooksList.length; i += batchSize) {
            const batch = nytBooksList.slice(i, i + batchSize);
            console.log(`Processing batch ${i/batchSize + 1} of bestsellers`);
            
            const batchResults = await Promise.all(
                batch.map(async (book) => {
                    try {
                        const googleBooks = await axios.get(`https://www.googleapis.com/books/v1/volumes`, {
                            params: {
                                q: `isbn:${book.primary_isbn13}`,
                                key: process.env.GOOGLE_BOOKS_API_KEY
                            }
                        });

                        const googleBook = googleBooks.data.items?.[0];
                        
                        return {
                            google_book_id: googleBook?.id || `nyt-${book.primary_isbn13}`,
                            title: book.title,
                            author: book.author,
                            description: book.description,
                            rank: book.rank,
                            isbn13: book.primary_isbn13,
                            weeksOnList: book.weeks_on_list,
                            thumbnail: googleBook?.volumeInfo?.imageLinks?.thumbnail || null,
                            previewLink: googleBook?.volumeInfo?.previewLink || null
                        };
                    } catch (error) {
                        console.error(`Error fetching Google Books data for ${book.title}:`, error);
                        
                        return {
                            google_book_id: `nyt-${book.primary_isbn13}`,
                            title: book.title,
                            author: book.author,
                            description: book.description,
                            rank: book.rank,
                            isbn13: book.primary_isbn13,
                            weeksOnList: book.weeks_on_list,
                            thumbnail: null,
                            previewLink: null
                        };
                    }
                })
            );
            books.push(...batchResults);
            
            // delay
            if (i + batchSize < nytBooksList.length) {
                console.log('Waiting between batches to avoid rate limits...');
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }

        // Cache results
        bestsellersCache.set(cacheKey, books);
        console.log(`Cached ${books.length} bestsellers`);

        return books;
    } catch (error) {
        console.error('NYT API Error:', error);
        throw error;
    }
}
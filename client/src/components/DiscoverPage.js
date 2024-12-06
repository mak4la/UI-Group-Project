import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './DiscoverPage.css';
import AddToListModal from './AddToListModal';

const DiscoverPage = () => {
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState([]);
    const [bestsellers, setBestsellers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchBestsellers();
    }, []);

    const fetchBestsellers = async () => {
        console.log('Attempting to fetch bestsellers...'); // Debug log
        try {
            const response = await fetch('http://localhost:5050/api/books/bestsellers');
            if (!response.ok) {
                console.error('Bestsellers response not OK:', await response.text());
                return;
            }
            const data = await response.json();
            console.log('Bestsellers data received:', data); // Debug log
            setBestsellers(data);
        } catch (error) {
            console.error('Error fetching bestsellers:', error);
        }
    };

    const handleSearch = async () => {
        if (!query.trim()) return;

        setIsLoading(true);
        console.log('Attempting search with query:', query); // Debug log
        try {
            const response = await fetch(`http://localhost:5050/api/books/search?q=${encodeURIComponent(query)}`);
            if (!response.ok) {
                console.error('Search response not OK:', await response.text());
                return;
            }
            const data = await response.json();
            console.log('Search results received:', data); // Debug log
            setBooks(data);
        } catch (error) {
            console.error('Search failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const BookCard = ({ book, isSearchResult }) => {
        const [showModal, setShowModal] = useState(false);

        const handleAddToList = async (book, listId) => {
            console.log('Attempting to add book to list:', { book, listId }); // Debug log
            try {
                const response = await fetch('http://localhost:5050/api/books/list/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        listId,
                        googleBookId: book.google_book_id
                    })
                });
                
                if (!response.ok) {
                    console.error('Add to list response not OK:', await response.text());
                    return;
                }

                console.log('Book successfully added to list'); // Debug log
                setShowModal(false);
            } catch (error) {
                console.error('Error adding book to list:', error);
            }
        };

        return (
            <>
                <div className="book-card">
                    <img 
                        src={book.thumbnail || '/placeholder-book.png'} 
                        alt={book.title} 
                        className="book-cover"
                    />
                    <div className="book-info">
                        <h3>{book.title}</h3>
                        <p className="author">
                            {isSearchResult ? book.authors?.join(', ') : book.author}
                        </p>
                        <button 
                            className="add-to-list"
                            onClick={() => setShowModal(true)}
                        >
                            Add to List
                        </button>
                    </div>
                </div>

                <AddToListModal 
                    book={book}
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    onAddToList={handleAddToList}
                />
            </>
        );
    };

    return (
        <div className="discover-page">
            <nav className="discover-nav">
                <Link to="/" className="back-link">← Back to Home</Link>
            </nav>
            
            <div className="discover-header">
                <h1>Discover Your Next Read</h1>
                <div className="search-container">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for books..."
                        className="search-input"
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <button 
                        onClick={handleSearch}
                        disabled={isLoading}
                        className="search-button"
                    >
                        {isLoading ? 'Searching...' : 'Search'}
                    </button>
                </div>
            </div>

            {books.length > 0 ? (
                <div className="book-section">
                    <h2>Search Results</h2>
                    <div className="books-grid">
                        {books.map((book) => (
                            <BookCard 
                                key={book.google_book_id} 
                                book={book} 
                                isSearchResult={true}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                bestsellers.length > 0 && (
                    <div className="book-section">
                        <h2>NYT Bestsellers</h2>
                        <div className="books-grid">
                            {bestsellers.map((book) => (
                                <BookCard 
                                    key={book.google_book_id} 
                                    book={book} 
                                    isSearchResult={false}
                                />
                            ))}
                        </div>
                    </div>
                )
            )}
        </div>
    );
};

export default DiscoverPage;
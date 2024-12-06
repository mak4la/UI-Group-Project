import React, { useState } from 'react';
import './BookSearch.css';

const BookSearch = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    try {
      setIsSearching(true);
      const response = await fetch(`http://localhost:5050/api/books/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  return (
    <div className="book-search-container">
      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for books..."
          className="search-input"
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>

      {books && books.length > 0 && (
        <div className="search-overlay">
          <div className="search-results">
            <div className="results-header">
              <h3>Search Results</h3>
              <button onClick={() => setBooks([])} className="close-button">×</button>
            </div>
            <div className="books-grid">
              {books.map((book) => (
                <div key={book.google_book_id} className="book-card">
                  <img src={book.thumbnail} alt={book.title} className="book-cover" />
                  <div className="book-info">
                    <h4>{book.title}</h4>
                    <p className="author">{book.authors?.join(', ')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookSearch;
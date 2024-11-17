import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import BookReviews from './BookReviews'; 
import Lists from './Lists';
import ListedBooks from './ListedBooks';
import Book from './Book';


function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books/:bookId/reviews" element={<BookReviews />} /> {/* Route for Book Reviews with dynamic bookId */}
        <Route path="/lists" element={<Lists />} /> {/* Route for User's Lists*/}
        <Route path="/lists/:listId" element={<ListedBooks />} /> {/* Route for one of a User's Lists*/}
        <Route path="/lists/:listId/:bookid" element={<Book />} /> {/* Temporary route to show book info in list*/}
      </Routes>
    </div>
  </Router>
  );
}

export default App;

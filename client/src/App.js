import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import BookReviews from './BookReviews'; 
import Lists from './Lists';


function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books/:bookId/reviews" element={<BookReviews />} /> {/* Route for Book Reviews with dynamic bookId */}
        <Route path="/lists" element={<Lists />} /> {/* Route for Lists*/}
      </Routes>
    </div>
  </Router>
  );
}

export default App;

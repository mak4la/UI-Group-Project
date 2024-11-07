import React, { useState, useEffect } from 'react';
import './BookReviews.css';
import { useParams, useNavigate } from 'react-router-dom';
import booksData from './data/books.json';

const BookReviews = () => {
  const { bookId } = useParams(); // Get book ID from the URL
  const [bookTitle, setBookTitle] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [username, setUsername] = useState(''); // New state for username
  const [reviews, setReviews] = useState([]); // State for reviews
  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    // Get the book title from the imported JSON data
    const book = booksData[bookId];
    if (book) {
      setBookTitle(book.title); // Set the book title from the JSON data
    } else {
      console.error("Book not found in the mock data");
    }
  }, [bookId]);

  const handleRatingSubmit = () => {
    if (reviewText.trim() !== '' && username.trim() !== '') {
      // Create a new review object with current date and time
      const newReview = {
        id: reviews.length + 1, // Simple ID generation
        text: reviewText,
        rating: rating,
        username: username, // Add username to the review
        timestamp: new Date().toLocaleString(), // Add timestamp
      };

      // Update the reviews state
      setReviews([newReview, ...reviews]); // Add the new review at the beginning
      setReviewText(''); // Clear the review text field
      setRating(0); // Reset the rating
      setHover(0); // Reset the hover state
      setUsername(''); // Clear the username field
    } else {
      alert("Please enter both a review and a username."); // Alert if either field is empty
    }
  };

  const handleBackButtonClick = () => {
    navigate('/'); // Navigate back to the review- page
  };

  // Function to render stars based on the rating
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className={index < rating ? 'star filled' : 'star'}>
        &#9733; {/* Star character */}
      </span>
    ));
  };

  // Function to handle deleting a review
  const handleDeleteReview = (id) => {
    setReviews(reviews.filter(review => review.id !== id));
  };

  // Function to handle editing a review
  const handleEditReview = (id) => {
    const reviewToEdit = reviews.find(review => review.id === id);
    if (reviewToEdit) {
      setReviewText(reviewToEdit.text);
      setRating(reviewToEdit.rating);
      setUsername(reviewToEdit.username);
      handleDeleteReview(id); // Remove the review to be edited
    }
  };

  return (
    <>
      {/* Header Section */}
      <header className="review-page-header">
        <h1 className="review-page-title">PageNest</h1>
        <p className="review-page-subtitle">
          Share and read reviews 
        </p>
      </header>
      
      <div className="review-section">
        <h2 className="book-title">{bookTitle}</h2>
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${star <= (hover || rating) ? 'filled' : ''}`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(rating)}
            >
              &#9733;
            </span>
          ))}
        </div>
        <textarea
          className="review-text"
          placeholder="Write your review here..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        ></textarea>
        <input
          type="text"
          className="username-input"
          placeholder="Enter your username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div className="button-container">
          <button className="back-button" onClick={handleBackButtonClick}>
            Back to review-
          </button>
          <button className="submit-button" onClick={handleRatingSubmit}>
            Submit Review
          </button>
        </div>
        {/* Reviews Container */}
        <div className="reviews-container">
          {reviews.map((review) => (
            <div key={review.id} className="review">
              <div className="review-rating">
                {renderStars(review.rating)} {/* Render stars for the rating */}
              </div>
              <p><strong>{review.username}</strong>: {review.text}</p>
              <p className="review-timestamp">{review.timestamp}</p> {/* Display timestamp */}
              <div className="review-buttons">
                <button onClick={() => handleEditReview(review.id)}>Edit</button>
                <button onClick={() => handleDeleteReview(review.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BookReviews;

import React, { useState } from 'react';
import './ReviewForm.css';

const ReviewForm = ({ onSubmitReview }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitReview({ rating, review });
    setRating(0);
    setReview('');
  };

  return (
    <div className="review-form">
      <h3>Submit Your Review</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Rating:
          <select value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value="0">Select</option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>{num} Star{num > 1 && 's'}</option>
            ))}
          </select>
        </label>
        <label>
          Review:
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your review here..."
          />
        </label>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default ReviewForm;

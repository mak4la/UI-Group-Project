import React from 'react';
import './App.css'; 

const HomePage = () => {
  return (
    <div className="homepage">
      
      {/* Header Section */}
      <header className="homepage-header">
        <h1 className="homepage-title">Welcome to PageNest</h1>
        <p className="homepage-subtitle">
          Organize your book collection, share reviews, and discover new books effortlessly.
        </p>
      </header>

      {/* Features Section */}
      <section className="features container">
        <h2>Our Features</h2>
        <div className="features-cards">
          <div className="feature-card">
            <h3>Track Your Books</h3>
            <p>Easily keep track of the books you're currently reading or plan to read.</p>
          </div>
          <div className="feature-card">
            <h3>Write Reviews</h3>
            <p>Share your thoughts and help others discover the best books out there.</p>
          </div>
          <div className="feature-card">
            <h3>Discover New Books</h3>
            <p>Explore new books recommended by our community of book lovers.</p>
          </div>
        </div>
        
        {/* Temporary Link for Reviews and Rating System !!! */}
        <div className="temp-link">
          <a href="/books/1/reviews" className="temp-hyperlink">
            Click here to start working on Reviews and Rating System
          </a>
        </div>
      </section>

      {/* Cta*/}
      <section className="cta-section">
        <p>Join PageNest today and start tracking your book journey!</p>
        <a href="#register" className="button">Join Now</a>
      </section>
      
      
    </div>
  );
};


export default HomePage;

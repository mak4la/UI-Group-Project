import React from 'react';
import './App.css';  // Importing CSS styles for use in this component

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Homepage Header Section */}
      <header className="homepage-header">
        <h1>Welcome to PageNest!</h1>
        <p>
          PageNest is a book-tracking and review platform that helps you keep track of your books, share reviews, and explore new books. Whether you're an avid reader or just starting out, PageNest offers you the tools to organize, discover, and enjoy books to the fullest.
        </p>
      </header>

      {/* Features Section */}
      <section className="features">
        <h2>Features</h2>
        <ul>
          <li>Track the books you're currently reading and those you've completed.</li>
          <li>Write and share reviews with a community of book lovers.</li>
          <li>Discover new books recommended by others.</li>
        </ul>
      </section>

      {/* Call to Action */}
      <section className="cta-section text-center">
        <p>Ready to start your book journey?</p>
        <a href="#register" className="button">Join Now</a>
      </section>
    </div>
  );
};

export default HomePage;

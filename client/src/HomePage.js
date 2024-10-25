import React from 'react';

const HomePage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to PageNest!</h1>
      <p style={styles.paragraph}>
        PageNest is a book-tracking and review platform that helps you keep track of your reading, 
        share reviews, and explore new books. Whether you're an avid reader or just starting your reading journey, 
        PageNest offers you the tools to organize, discover, and enjoy books to the fullest.
      </p>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    color: '#333',
    fontSize: '2.5rem',
  },
  paragraph: {
    color: '#555',
    fontSize: '1.2rem',
    maxWidth: '600px',
    margin: '20px auto',
  },
};

export default HomePage;

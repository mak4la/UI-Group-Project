import React, { useState, useEffect } from 'react';
import './Book.css';

const Book = () => {
    return(
        <div className='book-page'>
            {/*<header className="book-header">
                <h1>PageNest</h1>
            </header> */}

            <div className='book'>
                <h1>The Great Gatsby</h1>
                <img src="https://bookstoreromanceday.org/wp-content/uploads/2020/08/book-cover-placeholder.png" alt="test" width="250" height="300"></img>
                <div className="star-rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star}>
                            &#9733;
                        </span>
                    ))}
                </div>
                <p>Author: F. Scott Fitzgerald</p>
                <p>
                    This is a sample description. 
                </p>
                <div className="button-group"> 
                    Work in Progress: 
                    <button> Add to List </button>     
                    <button> See Reviews </button>
                    <button> Notes </button>
                </div>

            </div>
            
            

            {/*<footer className="book-footer">
            </footer> */} 
        </div>
    );
}

export default Book
import React, { useState, useEffect } from 'react';
import './Book.css';

const Book = () => {
    const [noteText, setNoteText] = useState("")
    const [notes, setNotes] = useState([{id: 1, note: "Testing note"}])

    const addNote = (text) =>{
        setNotes([...notes, {id: notes.length, note: text}])
    }

    const handleNoteSubmit = (event) =>{
        if(noteText.trim() !== ''){
            addNote(noteText)
        }else{
            alert("Note must have text to add.")
        }
        
    }

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
                    <button className="book-button"> Add to List </button>     
                    <button className="book-button"> See Reviews </button>
                </div>
                <textarea
                    className="note-text"
                    placeholder="Write your note here..."
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                ></textarea>
                <button className="book-button" onClick={handleNoteSubmit}> Add Note </button>
            </div>
            
            {notes.map( note => (
                <div className='note'>
                    <text key={note.id}>{note.note}</text>
                </div>
            ))}

            {/*<footer className="book-footer">
            </footer> */} 
        </div>
    );
}

export default Book
import React, { useState, useEffect } from 'react';
import './AddToListModal.css';

const AddToListModal = ({ book, isOpen, onClose }) => {
    const [lists, setLists] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedListName, setSelectedListName] = useState('');

    useEffect(() => {
        if (isOpen) {
            fetchLists();
            setShowConfirmation(false); 
        }
    }, [isOpen]);

    const fetchLists = async () => {
        try {
            const userId = 1; 
            const response = await fetch(`http://localhost:5050/back/lists/${userId}`);
            const data = await response.json();
            setLists(data);
        } catch (error) {
            console.error('Error fetching lists:', error);
        }
    };

    const handleAddToList = async (listId, listName) => {
        try {
            const response = await fetch('http://localhost:5050/api/books/list/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    list_id: listId,
                    google_book_id: book.google_book_id,
                    bookDetails: {
                        title: book.title,
                        author: book.authors ? book.authors[0] : 'Unknown Author',
                        description: book.description || 'No Description',
                        thumbnail: book.thumbnail || ''
                    }
                })
            });
    
            if (response.ok) {
                setSelectedListName(listName);
                setShowConfirmation(true);
    
                setTimeout(() => {
                    setShowConfirmation(false);
                    onClose();
                }, 1500);
            } else {
                throw new Error('Failed to add book to list');
            }
        } catch (error) {
            console.error('Error adding book to list:', error);
            alert('Failed to add book to list. Please try again.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {showConfirmation ? (
                    <div className="confirmation-message">
                        <div className="confirmation-icon">✓</div>
                        <h2>Success!</h2>
                        <p>Added "{book.title}" to {selectedListName}</p>
                    </div>
                ) : (
                    <>
                        <h2>Add "{book.title}" to List</h2>
                        <div className="lists-section">
                            {lists.length === 0 ? (
                                <p className="no-lists-message">No collections yet. Create one first!</p>
                            ) : (
                                lists.map((list) => (
                                    <button
                                        key={list.id}
                                        className="list-select-button"
                                        onClick={() => handleAddToList(list.id, list.name)}
                                    >
                                        {list.name}
                                    </button>
                                ))
                            )}
                        </div>
                        <button className="close-button" onClick={onClose}>
                            Close
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default AddToListModal;
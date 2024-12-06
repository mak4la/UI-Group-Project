import React, { useState } from 'react';
import './AddToListModal.css';

const AddToListModal = ({ book, onClose, isOpen }) => {
    const lists = [
        { id: 1, name: 'To Be Read' },
        { id: 2, name: 'Read' },
        { id: 3, name: 'Favorites' }
    ];

    const handleAddToList = async (listId) => {
        try {
            console.log('Adding book to list:', listId);
            const response = await fetch(`http://localhost:5050/api/books/list/${listId}/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    googleBookId: book.google_book_id
                })
            });

            if (response.ok) {
                console.log('Book added successfully');
                onClose();
            }
        } catch (error) {
            console.error('Error adding book:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h2>Add to List</h2>
                <h3>{book.title}</h3>
                <div className="lists-container">
                    {lists.map(list => (
                        <button
                            key={list.id}
                            onClick={() => handleAddToList(list.id)}
                            className="list-option"
                        >
                            {list.name}
                        </button>
                    ))}
                </div>
                <button className="close-button" onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default AddToListModal;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Lists.css';

const Lists = () => {
   const [lists, setLists] = useState([]);
   const [newListName, setNewListName] = useState('');
   
   useEffect(() => {
       fetchLists();
   }, []);

   const fetchLists = async () => {
       try {
           const userId = 1;
           const response = await fetch(`http://localhost:5050/back/lists/${userId}`);
           const data = await response.json();
           setLists(data);
           
           for (const list of data) {
               await fetchListBooks(list.id);
           }
       } catch (error) {
           console.error('Error fetching lists:', error);
       }
   };

   const fetchListBooks = async (listId) => {
       try {
           const response = await fetch(`http://localhost:5050/api/books/list/${listId}`);
           const data = await response.json();
           setLists(prevLists => prevLists.map(list => 
               list.id === listId ? { ...list, books: data } : list
           ));
       } catch (error) {
           console.error('Error fetching list books:', error);
       }
   };

   const handleCreateList = async () => {
       if (!newListName.trim()) {
           alert('Please enter a list name');
           return;
       }

       try {
           const response = await fetch('http://localhost:5050/back/lists/add', {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json',
               },
               body: JSON.stringify({
                   data: [newListName, 1]
               })
           });

           if (response.ok) {
               setNewListName('');
               fetchLists();
           }
       } catch (error) {
           console.error('Error creating list:', error);
       }
   };

   const handleDeleteList = async (listId) => {
       if (!window.confirm('Are you sure you want to delete this list?')) {
           return;
       }

       try {
           const response = await fetch(`http://localhost:5050/back/lists/${listId}`, {
               method: 'DELETE'
           });

           if (response.ok) {
               fetchLists();
           }
       } catch (error) {
           console.error('Error deleting list:', error);
       }
   };

   return (
       <div className="lists-page">
           <Link to="/" className="back-link">← Back to Home</Link>
           
           <h1>My Collections</h1>
           
           <div className="create-list-section">
               <input
                   type="text"
                   value={newListName}
                   onChange={(e) => setNewListName(e.target.value)}
                   placeholder="New collection name..."
                   className="collection-input"
                   onKeyPress={(e) => e.key === 'Enter' && handleCreateList()}
               />
               <button 
                   onClick={handleCreateList}
                   className="create-collection-btn"
               >
                   Create Collection
               </button>
           </div>

           <div className="lists-grid">
               {lists.map((list) => (
                   <div key={list.id} className="list-card">
                       <div className="list-header">
                           <h2>{list.name}</h2>
                           <p>{list.books?.length || 0} Books</p>
                           <button 
                               onClick={() => handleDeleteList(list.id)}
                               className="delete-btn"
                           >
                               Delete List
                           </button>
                       </div>
                       <div className="books-preview">
                            {list.books?.map(book => (
                                <div key={book.google_book_id} className="book-item">
                                    <img 
                                        src={book.thumbnail || '/placeholder-book.png'} 
                                        alt={book.title}
                                        className="book-cover"
                                    />
                                    <h3 className="book-title">{book.title}</h3>
                                </div>
                            ))}
                        </div>
                   </div>
               ))}
           </div>
       </div>
   );
};

export default Lists;
import React, { useState, useEffect } from 'react';
import './Lists.css';
import List from './List';

const Lists = () =>{
  const [text, setText] = useState("")
  const [lists, setLists] = useState([
    {
      id: 1,
      name: "Reading"
    },
    {
      id:2,
      name:"Already Read"
    },
    {
      id:3,
      name:"Wishlist"
    }
  ]);

    const addList = (listName) =>{
      setLists([...lists, {id: lists.length, name: listName} ])
    }

    const handleSubmit = (event) =>
    {
      event.preventDefault()
      addList(text)
      setText("") /*reset the input box*/
    }
    return(
      <div className='lists-page'>
        <header className="lists-header">
          <h1>Your Lists</h1>
        </header>

        <form onSubmit={handleSubmit}>
          <input type='text' placeholder="Enter a list name" value={text} onChange={e => setText(e.target.value)}></input>
          <button type='submit'>Add List</button>
        </form>

        {lists.map( list => (
          <div className='list-box'>
            <List key={list.id} id={list.id} name={list.name}/> 
          </div>
        ))}

        <footer className="lists-footer">
          <h1>PageNest</h1>
        </footer>
      </div>
  );
}

export default Lists
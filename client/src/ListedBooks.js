import ListedBook from './ListedBook';
import './ListedBooks.css';
import {Link} from "react-router-dom";


const ListedBooks = () =>{
    const sample_books = [
        {
          id: 1,
          name: "The Great Gatsby",
          image: "https://bookstoreromanceday.org/wp-content/uploads/2020/08/book-cover-placeholder.png"
        },
        {
          id:2,
          name: "The Greatest Gatsby",
          image: "https://bookstoreromanceday.org/wp-content/uploads/2020/08/book-cover-placeholder.png"
        },
        {
          id:3,
          name: "The Greater Gatsby",
          image: "https://bookstoreromanceday.org/wp-content/uploads/2020/08/book-cover-placeholder.png"
        },
        {
          id:4,
          name: "Gatsby's Greatest",
          image: "https://bookstoreromanceday.org/wp-content/uploads/2020/08/book-cover-placeholder.png"
        },
        {
          id:5,
          name: "Gatsby's Greatest Book",
          image: "https://bookstoreromanceday.org/wp-content/uploads/2020/08/book-cover-placeholder.png"
        },
        {
            id: 6,
            name: "The Gatsby",
            image: "https://bookstoreromanceday.org/wp-content/uploads/2020/08/book-cover-placeholder.png"
          },
          {
            id:7,
            name: "Gatsby",
            image: "https://bookstoreromanceday.org/wp-content/uploads/2020/08/book-cover-placeholder.png"
          },
          {
            id:8,
            name: "Mockingbird",
            image: "https://bookstoreromanceday.org/wp-content/uploads/2020/08/book-cover-placeholder.png"
          },
          {
            id:9,
            name: "1948",
            image: "https://bookstoreromanceday.org/wp-content/uploads/2020/08/book-cover-placeholder.png"
          },
          {
            id:10,
            name: "Sandworm",
            image: "https://bookstoreromanceday.org/wp-content/uploads/2020/08/book-cover-placeholder.png"
          }
    ]


    return(
      <div className='list-page'>
        <Link to="/lists">
          <button className="back-button">Back</button>
        </Link>
        <h1 className="list-header">Reading</h1>
        <button className="add-button">Add Book</button>
        <div className='bookbox'>
          {sample_books.map( list => (
            <div className='book-tile'>
              <ListedBook key={list.id} id={list.id} name={list.name} image={list.image}/> 
            </div>
          ))}
        </div>
      </div>
    )

}

export default ListedBooks
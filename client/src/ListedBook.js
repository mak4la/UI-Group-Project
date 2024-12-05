import { Link } from 'react-router-dom';
import './ListedBooks.css'

export default function ListedBook({id, name, image}){

    return(
        <div> 
            <img src={image} alt="test" width="75" height="100"></img>
            <div>
                <Link to="/lists/1/1" className='book-link'>{name}</Link>
            </div>
            
        </div>
    )
}
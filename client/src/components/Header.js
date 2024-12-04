import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom';
import Logo from '../assets/LogoPN.png';

function Header() {
  return (
    <div className='header'>
      {/* <h1>Page Nest</h1> */}
      <img className ='img' src={Logo}/>
      <nav className='navLinks'>
        <Link to="/">Home</Link>
        <Link to="/books/:bookId/reviews">Book Reviews</Link>
        <Link to="/lists">Lists</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </nav>
      {/* <button className='profile'>Profile</button> */}
    </div>
  )
}

export default Header
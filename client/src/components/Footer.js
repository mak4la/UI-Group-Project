import React from 'react'
import './Footer.css'
import Logo from '../assets/LogoPN.png';

function Footer() {
  return (
    <div className='footer'>
        <img className ='img' src={Logo}/>
        <div className='footer-links'>
          <p>Contact Us</p>
          <p>Register</p>
          <p>Login</p>
        </div>
    </div>
  )
}

export default Footer
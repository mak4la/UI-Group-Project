import './HomePage.css';
import { data } from './data';
import React, { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Discover from './assets/discover.png';
import Organize from './assets/organize.png';
import Rate from './assets/rate_processed.png';

const HomePage = () => {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.data');
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5) {
          document.body.style.backgroundColor = el.dataset.bgcolor;
          document.body.style.color = el.dataset.txtcolor;
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call to set the background color based on the initial position

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* <Header /> */}
        <div className="homepage">
          <div className='top'>
            <div className='banner'>
              <h1>Welcome to the best app for bookworms</h1>
              <h2>Organize your book collections, share reviews, and discover new books</h2>
              <h3>Sign up to join our community!</h3>
              <button>
                <a href="/register" className='buttonHome'> Sign Up </a>
              </button>
            </div>
          </div>
         
          <div>
            <div className='data'>
              <div className='data-text-image'>
                <div className = 'data-text'>
                  <h1>Discover</h1>
                  <h2>What is your next read going to be?</h2>
                  <button>
                    <a href="/register" className='buttonHome'> Start Now </a>
                  </button>
                </div>
                <img src={Discover} alt="Discover Image" className='image' />
              </div>
            </div>
            <div className='data'>
              <div className='data-text-image'>
              <img src={Organize} alt="Organize Image" className='image' />
                <div className = 'data-text1'>
                  <h1>Organize</h1>
                  <h2>Create collections and keep track of your books</h2>
                  <button>
                    <a href="/register" className='buttonHome'> Start Now </a>
                  </button>
                </div>
              </div>
            </div>
            <div className='data'>
              <div className='data-text-image'>
                <div className = 'data-text'>
                  <h1>Rate & Review</h1>
                  <h2>Review and rate your favorite books!</h2>
                  <button>
                    <a href="/register" className='buttonHome'> Start Now </a>
                  </button>
                </div>
                <img src={Rate} alt="Rate Image" className='image' />
              </div>
            </div>
          </div>
        </div>
    </>
  );
}


export default HomePage;
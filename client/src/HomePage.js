import './HomePage.css';
import { data } from './data';
import React, { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

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
            {data.map((group, i) => (
              <div
                key={i}
                className={`data ${i === 0 ? 'data-small' : ''}`}
                data-bgcolor={group.theme.backgroundColor}
                data-txtcolor={group.theme.color}
                data-button={group.button}
              >
              {i % 2 === 0 ? (
                  <>
                    {group.image && <img src={group.image} alt={group.title} className='data-image' />}
                    <div className='text-content'>
                      {group.title && <h1>{group.title}</h1>}
                      {group.paragraph && <h2>{group.paragraph}</h2>}
                      {group.button && <button>{group.button}</button>}
                    </div>
                  </>
                ) : (
                  <>
                    <div className='text-content'>
                      {group.title && <h1>{group.title}</h1>}
                      {group.paragraph && <h2>{group.paragraph}</h2>}
                      {group.button && <button>{group.button}</button>}
                    </div>
                    {group.image && <img src={group.image} alt={group.title} className='data-image' />}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      {/* <Footer /> */}
    </>
  );
}


export default HomePage;



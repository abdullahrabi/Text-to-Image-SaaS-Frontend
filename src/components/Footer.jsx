import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // State to handle the visibility of the scroll to top button
  const [isVisible, setIsVisible] = useState(false);

  // Check scroll position and toggle visibility of scroll-to-top button
  const toggleVisibility = () => {
    if (window.pageYOffset > 500) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Add event listener for scrolling
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    // Cleanup the event listener
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className='flex items-center justify-between gap-4 py-3 mt-20 relative'>
      <Link to='/'>
        <img width={150} src={assets.logo} alt="Logo" />
      </Link>

      <p className='flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden'>
        Copyright © Abdullah Rabi.dev | All rights reserved.
      </p>

      <div className='flex gap-2.5'>
        <img width={35} src={assets.facebook_icon} alt="Facebook" />
        <img width={35} src={assets.twitter_icon} alt="Twitter" />
        <img width={35} src={assets.instagram_icon} alt="Instagram" />
      </div>

      {/* Scroll to Top button */}
      {isVisible && (
        <img
          className="fixed bottom-5 right-5 cursor-pointer w-10 h-10 opacity-70 hover:opacity-100 transition-opacity"
          src={assets.up_arrow}
          alt="Scroll to top"
          onClick={scrollToTop}
        />
      )}
    </div>
  )
}

export default Footer

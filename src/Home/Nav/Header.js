import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ParksDropdown from './ParksDropdown';
import { FaSearch } from 'react-icons/fa';
import './Header.css';

export default function Header() {
  const [isSticky, setSticky] = useState(false);

  const checkStickiness = () => setSticky(window.pageYOffset > 0);

  useEffect(() => {
    window.addEventListener('scroll', checkStickiness);

    return () => {
      window.removeEventListener('scroll', checkStickiness);
    };
  }, []);

  return (
    <div className={`header ${isSticky ? 'sticky' : ''}`}>
      <header className="home-header">
        <div className="left">
          <Link to="/home">
            <h1 className="trail-finder">Trail Finder</h1>
          </Link>
        </div>
        <div className="right">
          <ParksDropdown />
          <Link to="/contact" className="link contact">Contact</Link>
          <Link to="/search" className="link search"><FaSearch /></Link>
        </div>
      </header>
    </div>
  );
}

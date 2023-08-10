import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ParksDropdown.css';

const ParksDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div className="dropdown" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
    <div className="dropbtn" onClick={toggleDropdown}>Parks</div>
    {isOpen && (
      <div className="dropdown-content">
        <Link to="/parks">All Parks</Link>
        <Link to="/parks/national">National Parks</Link>
        <Link to="/parks/state">State Parks</Link>
      </div>
    )}
  </div>  
  );
};

export default ParksDropdown;

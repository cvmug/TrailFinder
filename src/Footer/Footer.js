import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-section">
        <h4 className="footer-heading">Explore</h4>
        <ul className="footer-links">
          <li><Link to="/regions">Regions</Link></li>
          <li><Link to="/parks">Parks</Link></li>
          <li><Link to="/trails">Trails</Link></li>
        </ul>
      </div>
      <div className="footer-section">
        <h4 className="footer-heading">Company</h4>
        <ul className="footer-links">
          <li><Link to="/about">About</Link></li>
        </ul>
      </div>
      <div className="footer-section">
        <h4 className="footer-heading">Community</h4>
        <ul className="footer-links">
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>
      <div className="footer-bottom">
        <hr className="footer-line" />
        <p className="footer-text">&copy; {new Date().getFullYear()} Trail Finder. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;

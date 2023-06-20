import React from 'react'
import { Link } from 'react-router-dom';
import ParksDropdown from './ParksDropdown';
import { FaSearch } from 'react-icons/fa';
import './Header.css'

export default function Header() {
  return (
    <div>
      <header className="home-header">
<div className="left">
  <h1 className="trail-finder">Trail Finder</h1>
</div>
<div className="right">
  <ParksDropdown />
  <Link to="/contact" className="link contact">Contact</Link>
  <Link to="/search" className="link search"><FaSearch /></Link>
</div>
</header>
    </div>
  )
}


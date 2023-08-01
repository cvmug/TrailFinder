import React from 'react';
import { Link } from 'react-router-dom';

const NationalParks = () => {

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Coming Soon</h1>
      <p>This feature is currently under development. Please check back soon.</p>
      <Link to="/home" style={{ display: 'inline-block', textDecoration: 'none', color: 'white', backgroundColor: 'rgb(16, 65, 16)', padding: '10px 20px', borderRadius: '5px', marginTop: '20px' }}>
        &#8592; Return to Home
      </Link>
    </div>
  )
}

export default NationalParks;
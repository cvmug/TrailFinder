import React, { useState, useEffect, lazy, Suspense } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [photo, setPhoto] = useState(null);
  const [park, setPark] = useState({ url: null, name: null });
  const [lastUpdate, setLastUpdate] = useState(localStorage.getItem('lastUpdate'));

  const fetchParks = async () => {
    try {
      const parks = [];

      let start = 0;
      const batchSize = 50;

      while (true) {
        const response = await axios.get('https://developer.nps.gov/api/v1/parks', {
          params: {
            limit: batchSize,
            start,
            api_key: 'hyH0Z9SbWd3rRNDSqJIZnaKp1qc0D8oWwgQapp5D',
          },
        });

        parks.push(...response.data.data);

        if (response.data.data.length < batchSize) {
          break;
        }

        start += batchSize;
      }

      // Filter parks to only include National Parks
      const nationalParks = parks.filter(park => park.designation === "National Park");

      // Log all national parks to the console
      console.log(nationalParks);

      // Ensure there is at least one National Park returned
      if (!nationalParks.length) {
        console.error('No national parks found.');
        return;
      }

      const randomPark = nationalParks[Math.floor(Math.random() * nationalParks.length)];
      const parkPhoto = randomPark.images[0].url;

      setPark({ url: parkPhoto, name: randomPark.fullName });

      setPhoto(parkPhoto);
      localStorage.setItem('photo', parkPhoto);

      const now = new Date();
      setLastUpdate(now);
      localStorage.setItem('lastUpdate', now);

    } catch (error) {
      console.error('Error fetching parks:', error);
    }
  };

  useEffect(() => {
    fetchParks();
    const interval = setInterval(fetchParks, 10000); // fetch new parks every 10 seconds
    return () => clearInterval(interval); // clean up on component unmount
  }, []);

  const LazyImage = lazy(() => import('./LazyImage'));

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="left">
          <h1 className="trail-finder">Trail Finder</h1>
        </div>
        <div className="right">
          <Link to="/search" className="link"><FaSearch /></Link>
          <Link to="/parks" className="link">Parks</Link>
          <Link to="/contact" className="link">Contact</Link>
        </div>
      </header>
      <div className="featured-park">
        {park.url && (
          <Suspense fallback={<div>Loading...</div>}>
            <LazyImage src={park.url} alt={park.name} />
          </Suspense>
        )}
        {park.name && <h2>{park.name}</h2>}
      </div>
      <div>
        <h2 className="resources">Explore Our Resources</h2>
        <div className="link-section">
          <Link to="/map" className="link-box map-box">
            <h3>National Parks Map</h3>
          </Link>
          <Link to="/quiz" className="link-box quiz-box">
            <h3>Trail Finder Quiz</h3>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;

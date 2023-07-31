import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import Header from './Nav/Header';
import Local from './Local/Local';
import Footer from '../Footer/Footer';
import './Home.css';

const Home = () => {
  const [photo, setPhoto] = useState(null);
  const [park, setPark] = useState({ url: null, name: null });
  const [lastUpdate, setLastUpdate] = useState(localStorage.getItem('lastUpdate'));
  const [isLoading, setIsLoading] = useState(false);
  const [animationData, setAnimationData] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const NPS_API_KEY = process.env.REACT_APP_NPS_API_KEY;


  const fetchParks = useCallback(async () => {
    setIsLoading(true);
    setIsImageLoaded(false);

    const cachedParks = localStorage.getItem('nationalParks');
    let nationalParks = [];

    if (cachedParks) {
      nationalParks = JSON.parse(cachedParks);
    } else {
      try {
        const response = await axios.get(
          'https://developer.nps.gov/api/v1/parks',
          {
            params: {
              limit: 50,
              designation: 'National Park',
              api_key: NPS_API_KEY,
            },
          }
        );

        nationalParks = response.data.data;
        localStorage.setItem('nationalParks', JSON.stringify(nationalParks));
      } catch (error) {
        console.error('Error fetching parks:', error);
        setIsLoading(false);
        return;
      }
    }

    if (nationalParks.length) {
      const randomPark = nationalParks[Math.floor(Math.random() * nationalParks.length)];
      const parkPhoto = randomPark.images[0].url;

      setPark({ url: parkPhoto, name: randomPark.fullName });

      const preloadImage = new Image();
      preloadImage.src = parkPhoto;
      preloadImage.onload = () => {
        setPhoto(parkPhoto);
        setIsImageLoaded(true);
        setIsLoading(false);
      };
    } else {
      console.error('No national parks found.');
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchAnimationData = async () => {
      try {
        const response = await axios.get(
          'https://assets10.lottiefiles.com/private_files/lf30_RbQsUF.json'
        );
        setAnimationData(response.data);
      } catch (err) {
        console.error('Failed to fetch animation data:', err);
      }
    };

    fetchAnimationData();
  }, []);

  useEffect(() => {
    fetchParks();
    const interval = setInterval(() => fetchParks(), 10000); // fetch new parks every 5 seconds
    return () => clearInterval(interval); // clean up on component unmount
  }, [fetchParks]);

  return (
    <div className="home-container">
      <Header />
      <div className="featured-park">
        {isLoading ? (
          <div className="loading-animation-container">
            <div className="loading-animation">
              <Lottie
                animationData={animationData}
                style={{ width: '600px', height: '600px' }}
              />
            </div>
          </div>
        ) : (
          park.url && (
            <img
              id="parkPhoto"
              className="fade-in-out"
              src={park.url}
              alt={park.name}
            />
          )
        )}
        {park.name && <h2>{park.name}</h2>}
      </div>
      <div className='resources-links'>
        <h2 className="resources-heading">Resources</h2>
        <h3 className='resources-subheading'>Click on an image below to find out more</h3>
        <div className="link-section">
          <Link to="/map" className="link-box map-box">
            <h3 className='home-h3'>National Parks Map</h3>
          </Link>
          <Link to="/quiz" className="link-box quiz-box">
            <h3 className='home-h3'>Trail Finder Quiz</h3>
          </Link>
          <Link to="/trending" className="link-box trending-box">
            <h3 className='home-h3'>Trending Trails</h3>
          </Link>
          <Link to="/quiz" className="link-box forests-box">
            <h3 className='home-h3'>National Forests</h3>
          </Link>
        </div>
      </div>
      <div className="local-container">
        <Local />
      </div>
      <Footer />
    </div>
  );
}

export default Home;

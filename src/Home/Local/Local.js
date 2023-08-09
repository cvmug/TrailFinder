import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import parkCoordinates from './parkCoordinates.json';
import Lottie from 'lottie-react';
import './Local.css';

export default function Local() {
  const [parks, setParks] = useState([]);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [animationData, setAnimationData] = useState(null);
  const [displayedParks, setDisplayedParks] = useState(6);

  const NPS_API_KEY = process.env.REACT_APP_NPS_API_KEY;


  const getDistanceInMiles = (lat1, lon1, lat2, lon2) => {
    const R = 3958.8; // Radius of the earth in miles
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in miles
    return d;
  };

  const fetchUserLocation = async () => {
    const response = await axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.REACT_APP_GOOGLE_API_KEY}`);

    setLocation(response.data.location);
    console.log('User Location:', response.data.location);  // Log the location

  };

  const fetchParksData = async (start = 0, parksData = []) => {
    setIsLoading(true);

    // Guard clause to ensure location data is ready
    if (!location) {
      console.log("Location data is not ready yet.");
      return;
    }

    const response = await axios.get('https://developer.nps.gov/api/v1/parks', {
      params: {
        start: start,
        limit: 63,
        api_key: NPS_API_KEY,
        fields: 'images',
      },
    });

    parksData = parksData.concat(
      response.data.data
        .filter(park => park.designation === 'National Park') // Filter out only National Parks
        .map((park) => {
          const matchingCoordinates = parkCoordinates.find((coords) => coords.name === park.fullName);
          const distance = matchingCoordinates ? getDistanceInMiles(location.lat, location.lng, matchingCoordinates.coordinates.latitude, matchingCoordinates.coordinates.longitude) : null;

          const imageUrl = park.images.length > 0 ? park.images[0].url : null;

          return { ...park, coordinates: matchingCoordinates?.coordinates, distance, imageUrl };
        })
    );

    if (response.data.data.length < 63) {
      // Sort parks by distance to user's location
      parksData.sort((a, b) => {
        if (a.coordinates && b.coordinates) {
          const distA = getDistance(location.lat, location.lng, a.coordinates.latitude, a.coordinates.longitude);
          const distB = getDistance(location.lat, location.lng, b.coordinates.latitude, b.coordinates.longitude);
          return distA - distB;
        }
        return 0;
      });

      // Limit to top 5 closest parks
      console.log(parksData);
      setParks(parksData);

      setIsLoading(false);
    } else {
      // Fetch next set of parks
      fetchParksData(start + 63, parksData);
    }
  };

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
    fetchUserLocation();
  }, []);

  useEffect(() => {
    if (location) {
      fetchParksData();
    }
  }, [location]);

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180)
  }

  if (error) {
    return <p>{error}</p>;
  }

  const handleSeeMore = () => {
    const totalParks = parks.length; // Total number of parks fetched from the API
    console.log('Total Parks:', totalParks, 'Currently Displayed:', displayedParks);
    const nextDisplayedParks = Math.min(displayedParks + 3, totalParks);
    setDisplayedParks(nextDisplayedParks);
  };

  return (
    <div className="local-trails-section">
      <div className="unit-toggle"></div>
      <div className="local-trails-heading">
        <h2 className="local-heading">Explore local national parks</h2>
        <h3 className="local-subheading">Parks nearest to you</h3>
        <button className="local-button" onClick={handleSeeMore}>
          See more
        </button>
      </div>
      <div className="local-trails-container">
        {isLoading ? (
          <div className="local-loading-animation-container">
            <div className="local-loading-animation">
              <Lottie animationData={animationData} style={{ width: '600px', height: '500px' }} />
            </div>
          </div>
        ) : (
          parks.slice(0, displayedParks).map((park) => (
            <Link to={`/parks/${park.parkCode}`} key={park.id}>
              <div
                className="trail-box"
                style={{
                  backgroundImage: park.imageUrl ? `url(${park.imageUrl})` : 'none',
                  backgroundSize: 'cover',
                }}
              >
                <div className="name-distance">
                  <h3 className="local-park-name">{park.fullName}</h3>
                  <p className="distance">
                    Distance: {getDistanceInMiles(location.lat, location.lng, park.coordinates.latitude, park.coordinates.longitude).toFixed(2)} mi
                  </p>
                </div>
                <div className="local-description">
                  <div className="text-content">
                    {park.description}
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
} 
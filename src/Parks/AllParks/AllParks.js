import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../Home/Nav/Header';
import axios from 'axios';
import { Collapse, Typography } from 'antd';
import _ from 'lodash';
import Lottie from 'lottie-react';
import './AllParks.css'; // Import the CSS
import Footer from '../../Footer/Footer';

const { Panel } = Collapse;

const AllParks = () => {
  const [parks, setParks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    const fetchAnimationData = async () => {
      try {
        const response = await axios.get('https://assets10.lottiefiles.com/private_files/lf30_RbQsUF.json');
        setAnimationData(response.data);
      } catch (err) {
        console.error('Failed to fetch animation data:', err);
      }
    };

    fetchAnimationData();
  }, []);

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // This ensures the container takes up the full viewport height
    width: '100%', // This ensures the container takes up the full width
  };

  const designations = [
    'National Park',
    'National Monument',
    'National Historic Site',
    'National Recreation Area',
    'National Preserve',
    'National Seashore',
    'National Lakeshore',
    'National River',
    'National Battlefield',
    'National Memorial',
    'National Heritage Area'
  ];

  useEffect(() => {
    const fetchParksData = async (start = 0, parksData = []) => {
      setIsLoading(true);
      try {
        const response = await axios.get('https://developer.nps.gov/api/v1/parks', {
          params: {
            start: start,
            limit: 50,
            api_key: NPS_API_KEY,
          },
        });
        const newParksData = parksData.concat(response.data.data);

        // Filter parks by designation
        const filteredParksData = newParksData.filter(park => designations.includes(park.designation));

        // If there's more data, keep fetching
        if (response.data.total > start + 50) {
          fetchParksData(start + 50, filteredParksData);
        } else {
          setParks(filteredParksData);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching parks data: ", error);
        setIsLoading(false);
      }
    };
    fetchParksData();
  }, []);

  // Group parks by designation using lodash
  const groupedParks = _.groupBy(parks, park => park.designation);

  return (
    <div className='all-parks-container'>
      <Header />
      <div className='all-parks-content-container'>
        {isLoading ? (
          animationData ? (
            <div style={containerStyle}>
              <Lottie animationData={animationData} loop autoplay style={{ height: 600, width: 600 }} />
            </div>
          ) : 'Loading...'
        ) : (
          <Collapse>
            {Object.entries(groupedParks).map(([designation, parks], index) => (
              <Panel header={designation} key={index}>
                <Collapse>
                  {parks.map((park, idx) => (
                    <Panel header={<Link to={`/parks/${park.parkCode}`}>{park.fullName}</Link>} key={idx}>
                      <Typography.Text>
                        {park.description}
                      </Typography.Text>
                    </Panel>
                  ))}
                </Collapse>
              </Panel>
            ))}
          </Collapse>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AllParks;

const NPS_API_KEY = process.env.REACT_APP_NPS_API_KEY;

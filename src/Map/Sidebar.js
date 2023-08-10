import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ selectedState, parksByDesignation, className }) => {
  return (
      <div className={className}>
          {selectedState && <h2>{selectedState}</h2>}
          {selectedState && Object.keys(parksByDesignation).map(designation => (
              <div key={designation}>
                  <h3>{designation}</h3>
                  {parksByDesignation[designation].map((park, index) => (
                      <div key={index}>
                          <h4 className='sidebar-park-name'><Link to={`/parks/${park.parkCode}`}>{park.fullName}</Link></h4>
                          <p>{park.description}</p>
                      </div>
                  ))}
              </div>
          ))}
      </div>
  );
};

export default Sidebar;
 
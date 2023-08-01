import React from 'react';

const Sidebar = ({ selectedState, parksByDesignation, className }) => {
    return (
      <div className={className}>
        {selectedState && <h2>{selectedState}</h2>}
        {selectedState && Object.keys(parksByDesignation).map(designation => (
          <div key={designation}>
            <h3>{designation}</h3>
            {parksByDesignation[designation].map((park, index) => (
              <div key={index}>
                <h4>{park.fullName}</h4>
                <p>{park.description}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

export default Sidebar;

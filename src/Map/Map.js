import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
// import { withResizeDetector } from 'react-resize-detector';
import './Map.css';
import Sidebar from './Sidebar';
import axios from 'axios';
import groupBy from 'lodash/groupBy';
import stateCodes from './stateCodes.json';
import Header from '../Home/Nav/Header';
import Footer from '../Footer/Footer';

const geoUrl = "https://unpkg.com/us-atlas/states-10m.json";

const Map = () => {
    const [selectedState, setSelectedState] = useState(null);
    const [parksByDesignation, setParksByDesignation] = useState({});

    const NPS_API_KEY = process.env.REACT_APP_NPS_API_KEY;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchParksData = async () => {
            if (selectedState) {
                try {
                    const response = await axios.get('https://developer.nps.gov/api/v1/parks', {
                        params: {
                            stateCode: stateCodes[selectedState], // use the state code corresponding to the selected state
                            api_key: NPS_API_KEY,
                            fields: 'images,designation',
                        },
                    });

                    const parksGroupedByDesignation = groupBy(response.data.data, 'designation');
                    setParksByDesignation(parksGroupedByDesignation);

                } catch (error) { // Define error here
                    console.log(error); // Now you can log the error
                }
            }
        };

        fetchParksData();
    }, [selectedState, NPS_API_KEY]);


    const handleStateClick = (geo) => {
        setSelectedState(prevSelectedState => (
            prevSelectedState === geo.properties.name ? null : geo.properties.name
        ));
    };

    return (
        <div>
            <Header />
            <div className="content-container">
                <div className="introduction">
                    <h2 className='us-map'>United States Parks Map</h2>
                    <p>Click on any state in the map to view the parks located in that state.</p>
                </div>
                <div className="map-container">
                    <div className="map">
                        <div className="map-wrapper">
                            <ComposableMap
                                projectionConfig={{ scale: 1000 }}
                                projection="geoAlbersUsa"
                            >
                                <Geographies geography={geoUrl}>
                                    {({ geographies }) =>
                                        geographies.map((geo) => (
                                            <Geography
                                                key={geo.rsmKey}
                                                geography={geo}
                                                onClick={() => handleStateClick(geo)}
                                                className={`map-geography ${selectedState === geo.properties.name ? 'selected' : ''}`}
                                            />
                                        ))
                                    }
                                </Geographies>
                            </ComposableMap>
                        </div>
                    </div>
                    <Sidebar
                        selectedState={selectedState}
                        parksByDesignation={parksByDesignation}
                        className={`sidebar ${selectedState ? 'visible' : ''}`}
                    />
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default Map;
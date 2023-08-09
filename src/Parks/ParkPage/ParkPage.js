import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ParkPage.css';
import Header from '../../Home/Nav/Header';
import Footer from '../../Footer/Footer';
import Lightbox from 'react-lightbox-component';
import stateNames from './stateNames.json'

import 'react-lightbox-component/build/css/index.css';

const NPS_API_KEY = process.env.REACT_APP_NPS_API_KEY;

const ParkPage = () => {
    const [parkData, setParkData] = useState(null);
    const [campgrounds, setCampgrounds] = useState([]);
    const [alerts, setAlerts] = useState([]);
    const { nameofpark } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const parkResponse = await axios.get(`https://developer.nps.gov/api/v1/parks?parkCode=${nameofpark}&api_key=${NPS_API_KEY}`);
                setParkData(parkResponse.data.data[0]);

                const campgroundsResponse = await axios.get(`https://developer.nps.gov/api/v1/campgrounds?parkCode=${nameofpark}&api_key=${NPS_API_KEY}`);
                setCampgrounds(campgroundsResponse.data.data);

                const alertsResponse = await axios.get(`https://developer.nps.gov/api/v1/alerts?parkCode=${nameofpark}&api_key=${NPS_API_KEY}`);
                setAlerts(alertsResponse.data.data);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [nameofpark]);

    if (!parkData) {
        return <div>Loading...</div>;
    }

    const imagesForLightbox = parkData.images.map(img => ({
        src: img.url,
        title: img.title,
        description: img.altText
    }));

    const fullStateNames = parkData.states.split(',').map(abbrev => stateNames[abbrev]).join(', ');

    const parkDescription = parkData.description;

    return (
        <div className='park-page'>
            <Header />
            <div className="park-page-container">
                <div className="park-content">
                    <h1 className='park-page-name'>{parkData.fullName}</h1>
                    <p className='location'>{fullStateNames}</p>
                    <p className='park-description'>{parkDescription}</p>
                    <section className="image-gallery">
                        <Lightbox images={imagesForLightbox} />
                    </section>

                    <h2 className='details'>Details</h2>
                    <p className='weather'><strong>Weather Info:</strong> {parkData.weatherInfo}</p>
                    <p className='directions'><strong>Directions:</strong> {parkData.directionsInfo} <a className='directions-link' href={parkData.directionsUrl} target="_blank" rel="noopener noreferrer">More Directions</a></p>

                    <h3 className='entrance-fees'>Entrance Fees</h3>
                    {parkData.entranceFees && parkData.entranceFees.length > 0 ? (
                        <ul>
                            {parkData.entranceFees.map((fee, index) => (
                                <li key={index}>
                                    ${fee.cost} - {fee.description}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No entrance fees listed for this park.</p>
                    )}

                    <h2 className='campgrounds'>Campgrounds</h2>
                    {campgrounds && campgrounds.length > 0 ? (

                        <ul>
                            {campgrounds.map((campground, index) => (
                                <li key={index}>
                                    <h3>{campground.name}</h3>
                                    <p>{campground.description}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No campgrounds listed for this park.</p>
                    )}

                    <h2 className="alerts">Alerts</h2>
                    {alerts.length === 0 ? (
                        <p>No alerts listed for this park.</p>
                    ) : (
                        <ul>
                            {alerts.map((alert, index) => (
                                <li key={index}>
                                    <h3>{alert.title}</h3>
                                    <p>{alert.description}</p>
                                </li>
                            ))}
                        </ul>
                    )}

                    <h2 className="operating-hours">Operating Hours</h2>
                    {parkData.operatingHours && parkData.operatingHours.length > 0 ? (
                        <p>{parkData.operatingHours[0].description}</p>
                    ) : (
                        <p>No operating hours available for this park.</p>
                    )}
                    <h2 className='park-contact'>Contact</h2>
                    <p><strong>Email:</strong> {parkData.contacts.emailAddresses[0].emailAddress}</p>
                    <p><strong>Phone:</strong> {parkData.contacts.phoneNumbers[0].phoneNumber}</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ParkPage;
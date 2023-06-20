import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './Local.css';

export default function Local() {
    const [trails, setTrails] = useState([]);

    useEffect(() => {
        const fetchLocalTrails = () => {
            const localTrails = [
                { id: 1, name: 'Trail 1', description: 'Beautiful trail 1' },
                { id: 2, name: 'Trail 2', description: 'Beautiful trail 2' },
                { id: 3, name: 'Trail 3', description: 'Beautiful trail 3' },
                { id: 4, name: 'Trail 4', description: 'Beautiful trail 4' },
                { id: 5, name: 'Trail 5', description: 'Beautiful trail 5' },
                { id: 6, name: 'Trail 6', description: 'Beautiful trail 6' },
            ];
            return localTrails;
        };

        setTrails(fetchLocalTrails());
    }, []);

    return (
        <div className='local-trails-section'>
            <div className="local-trails-heading">
                <h2 className='local-heading'>Explore local trails</h2>
                <h3 className='local-subheading'>Trails closest to you</h3>
                <Link to="/home">
                    <button className='local-button'>See more</button>
                </Link>
            </div>
            <div className='local-trails-container'>
                {trails.map((trail) => (
                    <div key={trail.id} className='trail-box'>
                        <h3>{trail.name}</h3>
                        <p>{trail.description}</p>
                    </div>
                ))}

            </div>
        </div>
    );
}

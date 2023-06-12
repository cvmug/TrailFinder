import React from 'react'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './Landing.css'

export default function Landing() {
    return (
        <div className='landing-container'>
            <section className='landing-section'>
                <h2 className='landing-h2'>Discover Your Next Adventure</h2>
                <Link to="/home">
                    <button className='landing-button'>Get Started</button>
                </Link>
            </section>
        </div>
    )
}
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Landing from './Landing/Landing';
import Quiz from './Quiz/Quiz';
import Home from './Home/Home';
import './App.css';
import Map from './Map/Map';
import AllParks from './Parks/AllParks';
import NationalParks from './Parks/NationalParks';
import StateParks from './Parks/StateParks';
import Contact from './Contact';
import About from './About';
import Regions from './Regions';
import Trails from './Trails';
import Trending from './Trending';
import NationalForests from './Parks/NationalForests';

function App() {
  const imageURL = 'https://cdn.britannica.com/94/94294-050-13990B0E/Glacier-National-Park-Montana.jpg';

  return (
    <Router>
      <div className="App">
        <header className="App-header">
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/map" element={<Map  />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/parks" element={<AllParks />} />
            <Route path="/parks/national" element={<NationalParks />} />
            <Route path="/parks/state" element={<StateParks />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/regions" element={<Regions />} />
            <Route path="/trails" element={<Trails />} />
            <Route path="/about" element={<About />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/forests" element={<NationalForests />} />
          </Routes>
        </main>
        <footer>
          {/* <p>&copy; 2023 ParkTrailFinder. All rights reserved.</p> */}
        </footer>
      </div>
    </Router>
  );
}

export default App;
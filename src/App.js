import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Landing from './Landing/Landing';
import Quiz from './Quiz/Quiz';
import Home from './Home/Home';
import './App.css';

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
            <Route path="/quiz" element={<Quiz />} />
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
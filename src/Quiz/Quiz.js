import React, { useState } from 'react';
import './Quiz.css';

const Quiz = () => {
  const [results, setResults] = useState(null);
  const [answers, setAnswers] = useState({
    difficulty: '',
    distance: '',
    elevation: '',
  });

  const handleChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the user's answers and generate the results
    const recommendedTrail = calculateRecommendation(answers);
    setResults(recommendedTrail);
  };

  const calculateRecommendation = (answers) => {
    // Will be replaced with a more sophisticated algorithm to generate recommendations
    if (answers.difficulty === 'easy' && answers.distance === 'short' && answers.elevation === 'low') {
      return 'Yosemite National Park - Lower Yosemite Fall Trail';
    } else {
      return 'Grand Canyon National Park - Bright Angel Trail';
    }
  };

  return (
    <div className="quiz-container">
      {!results ? (
        <form className="quiz-form" onSubmit={handleSubmit}>
          <h2>Quiz: Find Your Perfect Trail</h2>

          <div>
            <label className="quiz-label" htmlFor="difficulty">Preferred Difficulty:</label>
            <select className="quiz-select" name="difficulty" id="difficulty" value={answers.difficulty} onChange={handleChange} required>
              <option value="">Select difficulty</option>
              <option value="easy">Easy</option>
              <option value="moderate">Moderate</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div>
            <label className="quiz-label" htmlFor="distance">Preferred Distance:</label>
            <select className="quiz-select" name="distance" id="distance" value={answers.distance} onChange={handleChange} required>
              <option value="">Select distance</option>
              <option value="short">Short (less than 5 miles)</option>
              <option value="medium">Medium (5-10 miles)</option>
              <option value="long">Long (more than 10 miles)</option>
            </select>
          </div>

          <div>
            <label className="quiz-label" htmlFor="elevation">Preferred Elevation Gain:</label>
            <select className="quiz-select" name="elevation" id="elevation" value={answers.elevation} onChange={handleChange} required>
              <option value="">Select elevation gain</option>
              <option value="low">Low (less than 500 ft)</option>
              <option value="moderate">Moderate (500-2000 ft)</option>
              <option value="high">High (more than 2000 ft)</option>
            </select>
          </div>

          <button className="quiz-button" type="submit">Find Trails</button>
        </form>
      ) : (
        <div>
          <h2>Recommended Park and Trail:</h2>
          <p>{results}</p>
        </div>
      )}
    </div>
  );
};

export default Quiz;

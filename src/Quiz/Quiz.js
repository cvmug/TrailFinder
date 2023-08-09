// import React, { useEffect, useState } from 'react';
// import Header from '../Home/Nav/Header';
// import Footer from '../Footer/Footer';
// import './Quiz.css';

// const Quiz = () => {
//   const [results, setResults] = useState(null);
//   const [answers, setAnswers] = useState({
//     difficulty: '',
//     distance: '',
//     elevation: '',
//   });

//   useEffect(() => {
//     window.scrollTo(0, 0);
// }, []);

//   const handleChange = (e) => {
//     setAnswers({ ...answers, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Process the user's answers and generate the results
//     const recommendedTrail = calculateRecommendation(answers);
//     setResults(recommendedTrail);
//   };

//   const calculateRecommendation = (answers) => {
//     // Will be replaced with a more sophisticated algorithm to generate recommendations
//     if (answers.difficulty === 'easy' && answers.distance === 'short' && answers.elevation === 'low') {
//       return 'Yosemite National Park - Lower Yosemite Fall Trail';
//     } else {
//       return 'Grand Canyon National Park - Bright Angel Trail';
//     }
//   };

//   return (
//     <div>
//     <div className='quiz-page'>
//       <Header />
//       <div className="quiz-container">
//         {!results ? (
//           <form className="quiz-form" onSubmit={handleSubmit}>
//             <h2 className='quiz-h2'>Find Your Perfect Trail</h2>

//             <div>
//               <label className="quiz-label" htmlFor="difficulty">Preferred Difficulty:</label>
//               <select className="quiz-select" name="difficulty" id="difficulty" value={answers.difficulty} onChange={handleChange} required>
//                 <option value="">Select difficulty</option>
//                 <option value="easy">Easy</option>
//                 <option value="moderate">Moderate</option>
//                 <option value="hard">Hard</option>
//               </select>
//             </div>

//             <div>
//               <label className="quiz-label" htmlFor="distance">Preferred Distance:</label>
//               <select className="quiz-select" name="distance" id="distance" value={answers.distance} onChange={handleChange} required>
//                 <option value="">Select distance</option>
//                 <option value="short">Short (less than 5 miles)</option>
//                 <option value="medium">Medium (5-10 miles)</option>
//                 <option value="long">Long (more than 10 miles)</option>
//               </select>
//             </div>

//             <div>
//               <label className="quiz-label" htmlFor="elevation">Preferred Elevation Gain:</label>
//               <select className="quiz-select" name="elevation" id="elevation" value={answers.elevation} onChange={handleChange} required>
//                 <option value="">Select elevation gain</option>
//                 <option value="low">Low (less than 500 ft)</option>
//                 <option value="moderate">Moderate (500-2000 ft)</option>
//                 <option value="high">High (more than 2000 ft)</option>
//               </select>
//             </div>
//             <button className="quiz-button" type="submit">Find Trails</button>
//           </form>
//         ) : (
//           <div>
//             <h2 className='recommended-trail-h2'>Recommended Park and Trail:</h2>
//             <p>{results}</p>
//           </div>
//         )}
//       </div>
//     </div>
//     <Footer />
//     </div>
//   );
// };

// export default Quiz;

import React from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Coming Soon</h1>
      <p>This feature is currently under development. Please check back soon.</p>
      <Link to="/home" style={{ display: 'inline-block', textDecoration: 'none', color: 'white', backgroundColor: 'rgb(16, 65, 16)', padding: '10px 20px', borderRadius: '5px', marginTop: '20px' }}>
        &#8592; Return to Home
      </Link>
    </div>
  )
}

export default Contact;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Home from './Home';
import DetailPage from './DetailPage';
import VotePage from './VotePage';
import CreateQuestion from './CreateQuestion';
import CreateOption from './CreateOption';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/question/:id" element={<DetailPage />} />
          <Route path="/question/:id/vote" element={<VotePage />} />
          <Route path="/create-question" element={<CreateQuestion />} />
          <Route path="/question/:id/create-option" element={<CreateOption />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

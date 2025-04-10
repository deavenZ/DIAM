import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Home from './Home';
import DetailPage from './DetailPage';
import VotePage from './VotePage';
import CreateOption from './CreateOption';
import CreateQuestion from './CreateQuestion';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-question" element={<CreateQuestion />} />
          <Route path="/question/:id" element={<DetailPage />} />
          <Route path="/vote/:id" element={<VotePage />} />
          <Route path="/question/:id/add-option" element={<CreateOption />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

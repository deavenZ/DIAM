import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import QuestionTable from './QuestionTable';

function Home() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/votacao/api/questoes/')
      .then(response => response.json())
      .then(data => setQuestions(data));
  }, []);

  return (
    <div className="home">
      <h1>Sistema de Votação</h1>
      <div className="actions">
        <Link to="/create-question" className="button add">Criar Nova Questão</Link>
      </div>
      <QuestionTable questions={questions} />
    </div>
  );
}

export default Home;
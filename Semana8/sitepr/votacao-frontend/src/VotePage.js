import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VoteForm from './VoteForm';

function VotePage() {
  const [question, setQuestion] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8000/votacao/api/question/${id}/`)
      .then(response => response.json())
      .then(data => setQuestion(data))
      .catch(error => console.error('Error:', error));
  }, [id]);

  const handleClose = () => {
    navigate('/');
  };

  if (!question) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="vote-page">
      <div className="vote-content">
        <h2>{question.questao_texto}</h2>
        <VoteForm question={question} onVoteComplete={handleClose} />
        <button onClick={handleClose} className="button">Voltar</button>
      </div>
    </div>
  );
}

export default VotePage; 
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './App.css';

function VotePage() {
  const [question, setQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8000/votacao/api/questao/${id}/`)
      .then(response => response.json())
      .then(data => setQuestion(data));
  }, [id]);

  const handleVote = () => {
    if (!selectedOption) {
      alert('Por favor, selecione uma opção para votar.');
      return;
    }

    fetch(`http://localhost:8000/votacao/api/opcao/${selectedOption}/votar/`, {
      method: 'POST'
    })
      .then(() => navigate(`/question/${id}`))
      .catch(() => alert('Erro ao registrar voto'));
  };

  if (!question) {
    return <div>A carregar...</div>;
  }

  return (
    <div className="container">
      <h2>{question.questao_texto}</h2>
      <div className="options-container">
        {question.opcao_set && question.opcao_set.map(opcao => (
          <div key={opcao.pk} className="option-item">
            <input
              type="radio"
              id={`option-${opcao.pk}`}
              name="vote"
              value={opcao.pk}
              onChange={(e) => setSelectedOption(e.target.value)}
            />
            <label htmlFor={`option-${opcao.pk}`}>{opcao.opcao_texto}</label>
          </div>
        ))}
      </div>
      <div className="button-group">
        <button onClick={handleVote} className="button">Votar</button>
        <button onClick={() => navigate(`/question/${id}`)} className="button">Cancelar</button>
      </div>
    </div>
  );
}

export default VotePage; 
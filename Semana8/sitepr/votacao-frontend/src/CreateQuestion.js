import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateQuestion() {
  const [questionText, setQuestionText] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!questionText.trim()) {
      alert('Por favor, insira um texto para a questão.');
      return;
    }

    fetch('http://localhost:8000/votacao/api/questoes/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ questao_texto: questionText })
    })
      .then(response => response.json())
      .then(data => navigate(`/question/${data.pk}`))
      .catch(() => alert('Erro ao criar questão'));
  };

  return (
    <div className="create-question">
      <h2>Criar Nova Questão</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="questionText">Texto da Questão:</label>
          <input
            type="text"
            id="questionText"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="button">Criar Questão</button>
          <button type="button" onClick={() => navigate('/')} className="button">Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default CreateQuestion; 
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateQuestion() {
  const [questionText, setQuestionText] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    fetch('http://localhost:8000/votacao/api/questions/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        questao_texto: questionText,
      }),
    })
      .then(response => response.json())
      .then(data => {
        navigate('/');
      })
      .catch(error => console.error('Error:', error));
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
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function CreateOption() {
  const [optionText, setOptionText] = useState('');
  const [question, setQuestion] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8000/votacao/api/question/${id}/`)
      .then(response => response.json())
      .then(data => setQuestion(data))
      .catch(error => console.error('Error:', error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    fetch(`http://localhost:8000/votacao/api/options/${id}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        opcao_texto: optionText,
        questao: id
      }),
    })
      .then(response => response.json())
      .then(data => {
        navigate(`/question/${id}`);
      })
      .catch(error => console.error('Error:', error));
  };

  if (!question) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="create-option">
      <h2>Adicionar Opção para: {question.questao_texto}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="optionText">Texto da Opção:</label>
          <input
            type="text"
            id="optionText"
            value={optionText}
            onChange={(e) => setOptionText(e.target.value)}
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="button">Adicionar Opção</button>
          <button type="button" onClick={() => navigate(`/`)} className="button">Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default CreateOption; 
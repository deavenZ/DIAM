import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function CreateOption() {
  const [question, setQuestion] = useState(null);
  const [optionText, setOptionText] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8000/votacao/api/questao/${id}/`)
      .then(response => response.json())
      .then(data => setQuestion(data));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!optionText.trim()) {
      alert('Por favor, insira um texto para a opção.');
      return;
    }
    
    fetch(`http://localhost:8000/votacao/api/opcoes/${id}/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        opcao_texto: optionText,
        questao: id
      })
    })
      .then(() => navigate(`/question/${id}`))
      .catch(() => alert('Erro ao adicionar opção'));
  };

  return (
    <div className="create-option">
      <h2>Adicionar Opção para: {question?.questao_texto}</h2>
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
          <button type="button" onClick={() => navigate(`/question/${id}`)} className="button">Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default CreateOption; 
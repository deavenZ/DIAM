import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './App.css';

function DetailPage() {
  const [question, setQuestion] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8000/votacao/api/questao/${id}/`)
      .then(response => response.json())
      .then(setQuestion);
  }, [id]);

  const deleteQuestion = () => {
    if (window.confirm('Tem certeza que deseja excluir esta questão?')) {
      fetch(`http://localhost:8000/votacao/api/questao/${id}/`, { method: 'DELETE' })
        .then(() => navigate('/'))
        .catch(() => alert('Erro ao excluir questão'));
    }
  };

  const deleteOption = (optionId) => {
    if (window.confirm('Tem certeza que deseja excluir esta opção?')) {
      fetch(`http://localhost:8000/votacao/api/opcao/${optionId}/`, { method: 'DELETE' })
        .then(() => {
          setQuestion(prev => ({
            ...prev,
            opcao_set: prev.opcao_set.filter(opcao => opcao.pk !== optionId)
          }));
        })
        .catch(() => alert('Erro ao excluir opção'));
    }
  };

  if (!question) {
    return <div>A carregar...</div>;
  }

  return (
    <div className="detail-page">
      <h2>{question.questao_texto}</h2>
      <div className="actions">
        <button onClick={() => navigate(`/vote/${id}`)} className="button">Votar</button>
        <button onClick={() => navigate(`/question/${id}/add-option`)} className="button add">Adicionar Opção</button>
        <button onClick={deleteQuestion} className="button delete">Excluir Questão</button>
      </div>
      <div className="options-list">
        {question.opcao_set && question.opcao_set.map(opcao => (
          <div key={opcao.pk} className="option-item">
            <div className="option-content">
              <span className="option-text">{opcao.opcao_texto}</span>
            </div>
            <div className="option-stats">
              <span className="vote-count">{opcao.votos}</span>
              <span className="vote-label">{opcao.votos === 1 ? 'voto' : 'votos'}</span>
            </div>
            <button onClick={() => deleteOption(opcao.pk)} className="button delete">Excluir</button>
          </div>
        ))}
      </div>
      <div className="back-button">
        <button onClick={() => navigate('/')} className="button">Voltar</button>
      </div>
    </div>
  );
}

export default DetailPage; 
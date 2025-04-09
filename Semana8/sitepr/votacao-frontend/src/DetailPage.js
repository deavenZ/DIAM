import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DetailData from './DetailData';
import VoteForm from './VoteForm';

function DetailPage() {
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
    <div className="detail-page">
      <div className="detail-content">
        <DetailData question={question} />
        <VoteForm question={question} onVoteComplete={handleClose} />
        <br />
        <button onClick={handleClose} className="button">Voltar</button>
      </div>
    </div>
  );
}

export default DetailPage; 
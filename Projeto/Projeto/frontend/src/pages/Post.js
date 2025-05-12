import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/Post.css';

function Post() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });

  useEffect(() => {
    if (id) {
      // TODO: Fetch post data from backend
      // This will be implemented when we connect to the backend
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Submit post data to backend
    // This will be implemented when we connect to the backend
    navigate('/');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (id && !post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="post-container">
      {isEditing || !id ? (
        <form onSubmit={handleSubmit} className="post-form">
          <h2>{id ? 'Editar Post' : 'Criar Novo Post'}</h2>
          <div className="form-group">
            <label htmlFor="title">Título</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Conteúdo</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows="10"
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="submit-button">
              {id ? 'Atualizar' : 'Publicar'}
            </button>
            {id && (
              <button
                type="button"
                className="cancel-button"
                onClick={() => setIsEditing(false)}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      ) : (
        <div className="post-view">
          <h2>{post.title}</h2>
          <div className="post-meta">
            <span>Por: {post.author}</span>
            <span>Data: {new Date(post.date).toLocaleDateString()}</span>
          </div>
          <div className="post-content">
            {post.content}
          </div>
          <div className="post-actions">
            <button
              className="edit-button"
              onClick={() => setIsEditing(true)}
            >
              Editar
            </button>
            <button
              className="delete-button"
              onClick={() => {
                // TODO: Implement delete functionality
                navigate('/');
              }}
            >
              Excluir
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Post;

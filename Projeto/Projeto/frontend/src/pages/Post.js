import React, { useState, useEffect, use } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { postService, leagueService, clubService } from '../services/api';
import '../styles/Post.css';

function Post() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '',
    texto: '',
    liga: '',
    clube: '',
    imagem: '',
    username: '',
    upvoteNumber: 0,
  });

  const [previewUrl, setPreviewUrl] = useState('');
  const [ligas, setLigas] = useState([]);
  const [clubesDaLiga, setClubesDaLiga] = useState([]);

  const { user } = useAuth();

  useEffect(() => {
    leagueService.getAll().then(res => setLigas(res.data));
  }, []);

  useEffect(() => {
    if (formData.liga) {
      const ligaId = typeof formData.liga === 'object' ? formData.liga.id : formData.liga;
      if (ligaId) {
        clubService.getByLiga(ligaId).then(res => setClubesDaLiga(res.data));
      }
    } else {
      setClubesDaLiga([]);
    }
  }, [formData.liga]);

  useEffect(() => {
    if (id) {
      console.log("Post page loaded")
      postService.getById(id)
        .then(res => {
          setPost(res.data);
          setFormData({
            titulo: res.data.titulo || '',
            texto: res.data.texto || '',
            liga: res.data.liga || '',
            clube: res.data.clube || '',
            imagem: res.data.imagem || '',
            username: res.data.autor || '',
            upvoteNumber: res.data.upvoteNumber || 0,
          });
        })
        .catch(() => navigate('/'));
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpa o clube se mudar de liga
    if (name === "liga") {
      setFormData(prev => ({
        ...prev,
        clube: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Creating new post with data:", formData);
      const data = new FormData();
      data.append("titulo", formData.titulo);
      data.append("texto", formData.texto);
      if (formData.liga) data.append("liga", formData.liga);
      if (formData.clube) data.append("clube", formData.clube);
      if (!id) data.append("data", new Date().toISOString());
      if (formData.imagem && typeof formData.imagem !== "string") {
        data.append("imagem", formData.imagem);
      }


      if (id) {
        setIsEditing(false);
        await postService.update(id, data);
        setPost({ ...post, ...formData });
      } else {
        await postService.create(data);
        navigate('/');
      }
    } catch (err) {
      alert('Erro ao guardar o post.');
    }
  };

  const handleUpvote = async () => {
    try {
      if (!user) {
        alert('Precisas de estar logado para dar upvote.');
      }
      const res = await postService.upvote(id);
      setPost(prev => ({
        ...prev,
        upvoteNumber: res.data.upvoteNumber
      }));
      setFormData(prev => ({
        ...prev,
        upvoteNumber: res.data.upvoteNumber
      }));
    } catch (err) {
      alert('Erro ao dar upvote.');
    }
  };



  if (id && !post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="post-container">
      {!isEditing && id && post && (post.liga || post.clube) && (
        <div className="post-banner post-banner-outside">
          {post.liga && (
            <span className="banner-item">
              {post.liga.logo && (
                <img
                  src={
                    post.liga.logo?.startsWith('http')
                      ? post.liga.logo
                      : `http://localhost:8000${post.liga.logo}`
                  }
                  alt={post.liga.nome}
                  className="banner-logo"
                  onError={e => { e.target.style.display = 'none'; }}
                />
              )}
              <span className="banner-text">{post.liga.nome}</span>
            </span>
          )}
          {post.clube && (
            <span className="banner-item">
              {post.clube.emblema && (
                <img
                  src={
                    post.clube.emblema?.startsWith('http')
                      ? post.clube.emblema
                      : `http://localhost:8000${post.clube.emblema}`
                  }
                  alt={post.clube.nome}
                  className="banner-logo"
                  onError={e => { e.target.style.display = 'none'; }}
                />
              )}
              <span className="banner-text">{post.clube.nome}</span>
            </span>
          )}
        </div>
      )}
      {isEditing || !id ? (
        <form onSubmit={handleSubmit} className="post-form">
          <h2>{id ? 'Editar Post' : 'Criar Novo Post'}</h2>
          <div className="form-group">
            <label htmlFor="titulo">Título</label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="imagem">Imagem do Post</label>
            {previewUrl || (formData.imagem && typeof formData.imagem === "string") ? (
              <img
                src={
                  previewUrl
                    ? previewUrl
                    : "http://127.0.0.1:8000" + formData.imagem
                }
                alt="imagem do post"
                height="250px"
                width="auto"
              />
            ) : null}
            <br />
            <input
              type="file"
              id="imagem"
              name="imagem"
              accept="image/*"
              onChange={e => {
                const file = e.target.files[0];
                if (file) {
                  setFormData(prev => ({
                    ...prev,
                    imagem: file
                  }));
                  setPreviewUrl(URL.createObjectURL(file));
                }
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="texto">Conteúdo</label>
            <textarea
              id="texto"
              name="texto"
              value={formData.texto}
              onChange={handleChange}
              rows="10"
            />
          </div>
          <div className="form-group">
            <label htmlFor="liga">Liga</label>
            <select
              id="liga"
              name="liga"
              value={formData.liga}
              onChange={handleChange}
            >
              <option value="">Nenhuma liga selecionada</option>
              {ligas.map(liga => (
                <option key={liga.id} value={liga.id}>{liga.nome}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="clube">Clube</label>
            <select
              id="clube"
              name="clube"
              value={formData.clube}
              onChange={handleChange}
              disabled={!formData.liga}
            >
              <option value="">Nenhum clube selecionado</option>
              {clubesDaLiga.map(clube => (
                <option key={clube.id} value={clube.id}>{clube.nome}</option>
              ))}
            </select>
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
          <h2>{post.titulo}</h2>
          <div className="post-meta">
            <span>Por: {post.autor || 'Desconhecido'}</span>
            <span>Data: {new Date(post.data).toLocaleDateString()}</span>
          </div>
          {post.imagem && (
            <img
              src={"http://127.0.0.1:8000" + formData.imagem}
              alt="imagem do post"
              className="post-image"
              height="250px"
              width="auto"
            />
          )}
          <br />
          <br />
          <div className="post-content">
            {post.texto}
          </div>

            <div className="post-upvote" style={{ margin: '32px 0 16px 0', textAlign: 'center' }}>
              <button
                onClick={() => {
                  if (!user) {
                    navigate('/login');
                  } else {
                    handleUpvote();
                  }
                }}
                className="upvote-button"
              >
                ⬆️
                <span style={{ marginLeft: 16, fontWeight: 'bold', fontSize: 20 }}>
                  {post.upvoteNumber || 0}
                </span>
              </button>
            </div>
          
          <br />
          {user && (post.autor === user.username || user.is_staff) && (
            <div className="post-actions">
              {post.autor === user.username && (
                <button
                  className="edit-button"
                  onClick={() => setIsEditing(true)}
                >
                  Editar
                </button>
              )}
              <button
                className="delete-button"
                onClick={async () => {
                  if (window.confirm("Tens a certeza que queres apagar este post?")) {
                    try {
                      await postService.delete(id);
                      navigate('/');
                    } catch (err) {
                      alert("Erro ao apagar o post.");
                    }
                  }
                }}
              >
                Excluir
              </button>
            </div>
          )}
        </div>
      )
      }
    </div >
  );
}

export default Post;
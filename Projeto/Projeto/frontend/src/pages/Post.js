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
    lida_id: '',
    clube: '',
    clube_id: '',
    imagem: '',
    username: '',
    upvoteNumber: 0,
  });

  const [previewUrl, setPreviewUrl] = useState('');
  const [ligas, setLigas] = useState([]);
  const [clubesDaLiga, setClubesDaLiga] = useState([]);
  const [comentarios, setComentarios] = useState([]);
  const [novoComentario, setNovoComentario] = useState('');
  const [comentarioErro, setComentarioErro] = useState('');
  const [forceUpdate, setForceUpdate] = useState(false);

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
            liga: res.data.liga?.id || res.data.liga || '',
            liga_id: res.data.liga?.id || res.data.liga || '',
            clube: res.data.clube?.id || res.data.clube || '',
            clube_id: res.data.clube?.id || res.data.clube || '',
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

    if (name === "liga") {
      setFormData(prev => ({
        ...prev,
        liga: value,
        liga_id: value,
        clube: '',
        clube_id: '',
      }));
    } else if (name === "clube") {
      setFormData(prev => ({
        ...prev,
        clube: value // Só altera o clube
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
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
      if (formData.liga) {
        data.append("liga", Number(formData.liga));
        data.append("liga_id", Number(formData.liga));
      } else {
        data.append("liga_id", "");
      }
      if (formData.clube) {
        data.append("clube", Number(formData.clube));
        data.append("clube_id", Number(formData.clube));
      } else {
        data.append("clube_id", "");
      }
      if (!id) data.append("data", new Date().toISOString());
      if (formData.imagem && typeof formData.imagem !== "string") {
        data.append("imagem", formData.imagem);
      }


      if (id) {
        await postService.update(id, data);
        const res = await postService.getById(id);
        setPost(res.data);
        setFormData({
          titulo: res.data.titulo || '',
          texto: res.data.texto || '',
          liga: res.data.liga?.id || res.data.liga || '',
          liga_id: res.data.liga?.id || res.data.liga || '',
          clube: res.data.clube?.id || res.data.clube || '',
          clube_id: res.data.clube?.id || res.data.clube || '',
          imagem: res.data.imagem || '',
          username: res.data.autor || '',
          upvoteNumber: res.data.upvoteNumber || 0,
        });
        setPreviewUrl('');
        setIsEditing(false);

        if (!res.data.clube) {
          setPost(prev => ({
            ...prev,
            clube: null
          }));
        }
      } else {
        await postService.create(data);
        navigate('/');
      }
    } catch (err) {
      alert('Erro ao guardar o post.');
    }
  };



  const handleUpvote = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      const res = await postService.upvote(id);
      setPost(prev => ({
        ...prev,
        upvoteNumber: res.data.upvoteNumber,
        upvoted: res.data.upvoted 
      }));
    } catch (err) {
      alert('Erro ao dar upvote.');
    }
  };

  const fetchComentarios = async () => {
    const res = await postService.getComentarios(id);
    setComentarios(res.data);
  };

  useEffect(() => {
    if (id) fetchComentarios();
  }, [id]);

  const handleComentarioSubmit = async (e) => {
    e.preventDefault();
    setComentarioErro('');

    if (!novoComentario.trim()) {
      setComentarioErro('O comentário não pode estar vazio.');
      return;
    }

    if (novoComentario.length > 1000) {
      setComentarioErro('O comentário não pode conter mais de 1000 caracteres.');
      return;
    }

    const form = new FormData();
    form.append('texto', novoComentario);

    try {
      const res = await postService.addComentario(id, form);
      if (res.status === 201) {
        setNovoComentario('');
        setComentarioErro('');
        fetchComentarios();
      } else {
        setComentarioErro('Erro ao enviar comentário');
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.texto) {
        setComentarioErro(err.response.data.texto.join(' '));
      } else {
        setComentarioErro('Erro ao enviar comentário');
      }
    }
  };

  const handleDeleteComentario = async (comentarioId) => {
    if (window.confirm("Tens a certeza que queres apagar este comentário?")) {
      try {
        await postService.deleteComentario(id, comentarioId);
        fetchComentarios();
      } catch (err) {
        setComentarioErro('Erro ao apagar comentário');
      }
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
                    : `http://localhost:8000${post.imagem}`
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
                  setFormData({ ...formData, imagem: file });
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
          <div className="form-actions form-actions-bottom-left">
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
            <span className="author-meta"> Por: {post.autor || 'Desconhecido'}</span>
            <span className="data-meta"> Data: {new Date(post.data).toLocaleDateString()}</span>
          </div>
          {post.imagem && (
            <img
              src={`http://localhost:8000${post.imagem}`}
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

          <br />
          <br />
          <div className="post-upvote" style={{ margin: '32px 0 16px 0', textAlign: 'center' }}>
            <button
              onClick={handleUpvote}
              className={`upvote-button${post.upvoted ? ' upvoted' : ''}`}
            >
              ⬆️
              <span style={{ marginLeft: 16, fontWeight: 'bold', fontSize: 20 }}>
                {post.upvoteNumber || 0}
              </span>
            </button>
          </div>

          <br />
          {user && (
            (post.autor?.username === user.username || post.autor === user.username || user.is_staff) && (
              <div className="post-actions">
                {(post.autor?.username === user.username || post.autor === user.username) && (
                  <button
                    className="edit-button"
                    onClick={() => setIsEditing(true)}
                  >
                    Editar Post
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
                  Excluir Post
                </button>
              </div>
            )
          )}
        </div>
      )} <div className="comentarios-section">
        {user && (
          <form onSubmit={handleComentarioSubmit} className="comentario-form">
            <textarea
              value={novoComentario}
              onChange={e => setNovoComentario(e.target.value)}
              placeholder="Escreve o teu comentário..."
              rows={3}
              disabled={isEditing || !id}
            />
            {comentarioErro && (
              <div className="comentario-erro">{comentarioErro}</div>
            )}
            <button type="submit" disabled={isEditing || !id}>
              Comentar
            </button>
          </form>
        )}
        <br /> 
        <ul className="comentarios-list">
          {comentarios.map(com => (
            <li key={com.id}>
              <span className="comentario-avatar-stack">
                {com.autor_avatar && (
                  <img
                    src={`http://localhost:8000${com.autor_avatar}`}
                    alt="avatar"
                  />
                )}
              </span>
              <span className="comentario-username">{com.autor_username}</span>
              <span className="comentario-texto">{com.texto}</span>
              {(user?.username === com.autor_username || user?.is_staff) && (
                <button
                  className="comentario-delete-button"
                  onClick={() => handleDeleteComentario(com.id)}
                >
                  Excluir
                </button>
              )}
            </li>
          ))}
          {comentarios.length === 0 && (
            <li className="sem-comentarios">Sem comentários ainda!</li>
          )}
        </ul>
      </div>

    </div >
  );
}

export default Post;
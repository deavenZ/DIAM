import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { postService, voteService } from '../services/api';
import '../styles/Home.css';

function Home() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [votes, setVotes] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetchPosts();
    fetchVotes();
    if (user && user.is_staff) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  const fetchPosts = async () => {
    try {
      const res = await postService.getAll();
      setPosts(res.data);
    } catch (err) {
      console.error('Erro ao buscar posts:', err);
    }
  };

  const fetchVotes = async () => {
    try {
      const res = await voteService.getAll();
      console.log('Votações:', res.data);
      setVotes(res.data);
    } catch (err) {
      console.error('Erro ao buscar votações:', err);
    }
  };

  return (
    <div className="home-container">
      <div className="posts-section">
        <div className="posts-header">
          <h2>Posts Recentes</h2>
          {user && (
            <Link to="/post/new" className="new-post-button">
              Criar Novo Post
            </Link>
          )}
        </div>
        <div className="posts-list">
          {posts.map((post) => (
            <Link
              to={`/post/${post.id}`}
              key={post.id}
              className="post-card-link"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="post-card">
                <h3 className="post-title-row">
                  <span>
                    {post.titulo}
                    {post.imagem && <span> &nbsp; 🖼️</span>}
                  </span>
                  {post.clube && post.clube.nome ? (
                    <span className="club-league-info">
                      {post.clube.emblema && (
                        <img
                          src={post.clube.emblema}
                          alt={post.clube.nome}
                          className="club-league-logo"
                          onError={e => { e.target.style.display = 'none'; }}
                        />
                      )}
                      {post.clube.nome}
                    </span>
                  ) : post.liga && post.liga.nome ? (
                    <span className="club-league-info">
                      {post.liga.logo && (
                        <img
                          src={post.liga.logo}
                          alt={post.liga.nome}
                          className="club-league-logo"
                          onError={e => { e.target.style.display = 'none'; }}
                        />
                      )}
                      {post.liga.nome}
                    </span>
                  ) : null}
                </h3>
                <p>
                  {post.texto && post.texto.length > 100
                    ? post.texto.slice(0, 100) + "..."
                    : post.texto}
                </p>
                <div className="post-meta">
                  <span className='author-meta'>
                    Por: {post.autor && post.autor.username ? post.autor.username : (post.autor || 'Desconhecido')}
                    <span className="upvote-badge">
                      ⬆️ {post.upvoteNumber}
                    </span>
                    <span className="comentarios-count-badge">
                      💬 {post.comentarios_count}
                    </span>
                  </span>
                  <span className='data-meta'>
                    Data: {post.data ? new Date(post.data).toLocaleDateString() : ''}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="voting-section">
        <div className="votes-header">
          <h2>Votações</h2>
          {user && isAdmin && (
            <Link to="/votes/new" className="new-post-button">
              Criar Nova Votação
            </Link>
          )}
        </div>
        <div className="votes-list">
          {votes.map((vote) => (
            <Link to={`/votes/${vote.id}`} key={vote.id} className="vote-card-link">
              <div className="vote-card">
                <h3>{vote.votacao_texto}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
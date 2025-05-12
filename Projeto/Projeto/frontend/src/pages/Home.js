// Homepage do site, onde vão estar os posts, e á esquerda as votações especificadas no pdf.

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  const [posts, setPosts] = useState([]);
  const [votes, setVotes] = useState([]);

  useEffect(() => {
    // TODO: Fetch posts and votes from backend
    // This will be implemented when we connect to the backend
  }, []);

  return (
    <div className="home-container">
      <div className="posts-section">
        <div className="posts-header">
          <h2>Posts Recentes</h2>
          <Link to="/post/new" className="new-post-button">
            Criar Novo Post
          </Link>
        </div>
        <div className="posts-list">
          {posts.map((post) => (
            <div key={post.id} className="post-card">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <div className="post-meta">
                <span>Por: {post.author}</span>
                <span>Data: {new Date(post.date).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="voting-section">
        <h2>Votações Ativas</h2>
        <div className="votes-list">
          {votes.map((vote) => (
            <div key={vote.id} className="vote-card">
              <h3>{vote.title}</h3>
              <p>{vote.description}</p>
              <div className="vote-options">
                {/* Vote options will be rendered here */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
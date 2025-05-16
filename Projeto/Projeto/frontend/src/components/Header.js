import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Header.css';

function Header() {
  const { user, logout, getProfileInfo } = useAuth();
  const navigate = useNavigate();

  const [avatarUrl, setAvatarUrl] = useState('https://via.placeholder.com/150');
  const [username, setUsername] = useState(null);

  const MEDIA_URL = 'http://localhost:8000';

  useEffect(() => {
    if (user) {
      getProfileInfo().then((response) => {
        console.log('Profile response:', response);
        const avatar = response.avatar;
        const username = response.username;
        setUsername(username);
        if (!avatar) {
          setAvatarUrl('https://via.placeholder.com/150');
        } else if (avatar.startsWith('http')) {
          setAvatarUrl(avatar);
        } else {
          setAvatarUrl(`${MEDIA_URL}${avatar}`);
        }
      });
    } else {
      setAvatarUrl('https://via.placeholder.com/150');
    }
  }, [user, getProfileInfo]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="app-header">
      <nav className="nav-menu">
        <Link to="/" className="nav-logo">Pontapé de Saída</Link>
        <div className="nav-links">
          {user ? (
            <>
              <Link to="/profile" className="profile-link">
                <label className="username-label">{username}</label>
                <img
                  src={avatarUrl}
                  alt="Foto do usuário"
                  className="user-avatar"
                />
              </Link>
              <button onClick={handleLogout} className="logout-button">
                Sair
              </button>
            </>
          ) : (
            <div>
              <Link to="/login" className="nav-link">Entrar</Link>
              <Link to="/register" className="nav-link">Registrar</Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;

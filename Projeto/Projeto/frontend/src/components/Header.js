import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Header.css';

function Header() {
  const { user, logout, getProfileInfo } = useAuth();
  const navigate = useNavigate();

  const [avatarUrl, setAvatarUrl] = useState('https://via.placeholder.com/150');
  const [username, setUsername] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const MEDIA_URL = 'http://localhost:8000';

  useEffect(() => {
    if (user) {
      getProfileInfo().then((response) => {
        console.log('Profile response:', response);
        const avatar = response.avatar;
        setUsername(response.username);
        const userType = response.userType;
        if (userType === 1 || userType === 2) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
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
    setIsAdmin(false);
    navigate('/');
  };

  return (
    <header className={`app-header${isAdmin ? ' admin-header' : ''}`}>
      <nav className="nav-menu">
        <Link to="/" className="nav-logo">
          <img
            src={MEDIA_URL + '/media/logos/site/site1.png'}
            alt="Logo do site"
            className="logo-image"
          />
        </Link>
        <div className="nav-links">
          {user ? (
            <>
              {isAdmin && <Link to="/users">Utilizadores</Link>}
              <Link to="/profile" className="profile-link">
                <label className="username-label">{isAdmin ? "Admin" : username}</label>
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
    </ header>
  );
}

export default Header;

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Header.css';

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  console.log('User no Header:', user);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const defaultAvatar = '/default_avatar.png';

  return (
    <header className="app-header">
      <nav className="nav-menu">
        <Link to="/" className="nav-logo">Pontapé de Saída</Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          {user ? (
            <>
              <Link to="/profile" className="profile-link">
                <img
                  src={user.photoURL || defaultAvatar}
                  alt="Foto do usuário"
                  className="user-avatar"
                />
              </Link>
              <button onClick={handleLogout} className="logout-button">
                Sair
              </button>
            </>
          ) : (
            <Link to="/login" className="nav-link">Entrar</Link>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;

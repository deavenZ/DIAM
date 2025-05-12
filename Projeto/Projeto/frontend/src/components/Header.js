import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
  return (
    <header className="app-header">
      <nav className="nav-menu">
        <Link to="/" className="nav-logo">Pontapé de Saída</Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/profile" className="nav-link">Perfil</Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;

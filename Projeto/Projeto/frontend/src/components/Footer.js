import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Footer.css';

function Footer() {

  const { user, getProfileInfo } = useAuth();
  const [clicked, setClicked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      getProfileInfo().then((response) => {
        const userType = response.userType;
        if (userType === 1 || userType === 2) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      });
    } else {
      setIsAdmin(false);
    }
  }, [user, getProfileInfo]);

  return (
    <footer className={`app-footer${isAdmin ? ' admin-footer' : ''}`} onClick={() => setClicked(!clicked)}>
      {clicked ? <p> Autores: João Antunes nº 111139, Rafael Lopes nº 111110. </p> : <p>&copy; 2025 Pontapé de Saída. Todos os direitos reservados.</p>}
    </footer>
  );
}

export default Footer; 
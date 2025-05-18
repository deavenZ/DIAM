import React, { useState } from 'react';
import '../styles/Footer.css';

function Footer() {

const [clicked, setClicked] = useState(false);

  return (
    <footer className="app-footer" onClick={() => setClicked(!clicked)}>
    {clicked ? <p> Autores: João Antunes, Rafael Lopes. </p> : <p>&copy; 2025 Pontapé de Saída. Todos os direitos reservados.</p> }
    </footer>
  );
}

export default Footer; 
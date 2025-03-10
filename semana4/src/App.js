import './App.css';
import Artista from './Artista.js';

function App() {
  return (
    <div className="App">
      <p><h1> Semana 4 </h1></p>
      <p><h2> Exercicio1 </h2></p>
      <Artista 
        nome="Tiagovski"
        imagem="/images/tiagovski.jpg"
        data="30 de Fevereiro"
        hora="23:59"
        estilo="Pimba"
        descricao="Boas, pessoal, vocês sabem quem fala, daqui é o Tiagovski a rebentar a escala, minecraft eu gosto de jogar! Com os meus episódios vos animar!"
      />
    </div>
  );
}

export default App;

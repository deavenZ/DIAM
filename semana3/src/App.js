import './App.css';
import Header from './Header';
import ImageSection from './Image';
import TableSection from './Table';
import SlideshowSection from './Slideshow';
import FooterSection from './Footer';

function App() {
  return (
    <div className="App">
      <Header/>
      <ImageSection/>
      <TableSection/>
      <SlideshowSection/>
      <FooterSection/>
    </div>
  );
}

export default App;

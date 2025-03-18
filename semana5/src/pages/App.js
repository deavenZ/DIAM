import Footer from '../components/Footer';
import Header from '../components/Header';
import Slideshow from '../components/home/Slideshow';
import Table from '../components/home/Table';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Header/>
      <Slideshow/>
      <Table/>
      <Footer/>
    </div>
  );
}

export default App;

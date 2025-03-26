import Footer from '../components/Footer';
import Header from '../components/Header';
import Confirmation from '../components/inqueritoConf/Conf'
import './Conf.css';


function Conf() {

    return (
      <div className='Conf'>
        <Header/>
        <Confirmation/>
        <Footer/>
      </div>
    );

  }
  
  export default Conf;
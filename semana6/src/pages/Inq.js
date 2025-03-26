import Footer from '../components/Footer';
import Header from '../components/Header';
import Inquerito from '../components/inqueritoHome/Inquerito'
import './Inq.css';


function Inq() {

    return (
      <div className='Inq'>
        <Header/>
        <Inquerito/>
        <Footer/>
      </div>
    );

  }
  
  export default Inq;

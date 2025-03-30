import Footer from '../components/Footer';
import Header from '../components/Header';
import Slideshow from '../components/home/Slideshow';
import Table from '../components/home/Table';

function Home() {
    return (
        <>
            <Header />
            <main>
                <Slideshow />
                <Table />
            </main>
            <Footer />
        </ >
    );
}

export default Home;

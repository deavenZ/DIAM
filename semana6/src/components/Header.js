import { Link } from "react-router-dom";
import "./header.css"

function Header() {

    return (
        <header>
            <br></br>
                <h1>Festival de Música Vilar de Mouros 2025</h1>
                <br></br>
                <nav>
                    <a><Link to="/">Pagina Inicial</Link></a>
                    <a><Link to="/form">Formulário de Voluntariado</Link></a>
                    <a><Link to = "/inq">Inquérito</Link></a>
                    <br></br>
                </nav>
        </header>
    );
}
export default Header;
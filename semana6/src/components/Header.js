import { Link } from "react-router-dom";
import "./header.css"

function Header() {

    return (
        <header>
                <h1>Festival de Música Vilar de Mouros 2025</h1>
                <nav>
                    <Link to="/" className="header-link">Pagina Inicial</Link>
                    <Link to="/form" className="header-link">Formulário de Voluntariado</Link>
                    <Link to="/inquerito" className="header-link">Inquérito</Link>
                </nav>
        </header>
    );
}
export default Header;
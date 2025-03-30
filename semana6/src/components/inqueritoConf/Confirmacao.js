import { useLocation, Link } from "react-router-dom";
import "./confirmacao.css"

function Confirmacao() {
    const location = useLocation();
    const { artistas, horario, critica } = location.state || {};

    return (
        <div className="confirmacao-container">
            <h2>Obrigado pelo seu inquérito!</h2>

            <h3>Artistas Preferidos:</h3>
            <ul>
                {artistas.map((artista, index) => <li key={index}>{artista}</li>)}
            </ul>

            <h3>Horário Preferido:</h3>
            <p>{horario}</p>

            <h3>Crítica:</h3>
            <p>{critica || "Nenhuma critica feita."}</p>

            <Link to="/" className="botao-voltar">Voltar á página Inicial</Link>
        </div>
    );
}

export default Confirmacao;
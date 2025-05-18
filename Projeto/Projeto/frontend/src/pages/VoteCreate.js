import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { voteService } from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import "../styles/VoteCreate.css";

function VoteCreate() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [titulo, setTitulo] = useState("");
    const [opcoes, setOpcoes] = useState(["", ""]);

    if (!user || !user.is_staff) return <div>Não autorizado.</div>;

    const handleChangeOpcao = (i, value) => {
        setOpcoes(opcoes.map((op, idx) => (idx === i ? value : op)));
    };

    const handleAddOpcao = () => setOpcoes([...opcoes, ""]);
    const handleRemoveOpcao = (i) => setOpcoes(opcoes.filter((_, idx) => idx !== i));

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await voteService.create({
                titulo,
                opcoes: opcoes.filter(Boolean),
            });
            navigate("/");
        } catch (err) {
            alert(err.response?.data?.error || "Erro ao criar votação");
        }
    };

    return (
        <div className="vote-create-container">
            <h2>Criar Nova Votação</h2>
            <form onSubmit={handleSubmit}>
                <input value={titulo} onChange={e => setTitulo(e.target.value)} placeholder="Título" required />
                <div className="opcoes-list">
                    <label>Opções:</label>
                    {opcoes.map((op, i) => (
                        <div key={i}>
                            <input
                                value={op}
                                onChange={e => handleChangeOpcao(i, e.target.value)}
                                required
                                placeholder={`Opção ${i + 1}`}
                            />
                            {opcoes.length > 2 && (
                                <button type="button" onClick={() => handleRemoveOpcao(i)}>Remover</button>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={handleAddOpcao}>Adicionar Opção</button>
                </div>
                <button type="submit">Criar Votação</button>
            </form>
        </div>
    );
}

export default VoteCreate;
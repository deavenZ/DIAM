import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { voteService } from "../services/api";
import { useAuth } from "../contexts/AuthContext";

function Vote() {
    const { id } = useParams();
    const { user } = useAuth();
    const [vote, setVote] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [voted, setVoted] = useState(false);

    useEffect(() => {
        voteService.getById(id).then(res => setVote(res.data));
    }, [id]);

    const handleVote = async () => {
        if (!selectedOption) return;
        await voteService.submitVote(id, selectedOption);
        setVoted(true);
        // Opcional: refetch para atualizar resultados
        const res = await voteService.getById(id);
        setVote(res.data);
    };

    if (!vote) return <div>A carregar votação...</div>;

    return (
        <div className="vote-container">
            <h2>{vote.titulo}</h2>
            <p>{vote.descricao}</p>
            <div>
                {vote.opcoes.map(opcao => (
                    <div key={opcao.id}>
                        <label>
                            <input
                                type="radio"
                                name="opcao"
                                value={opcao.id}
                                disabled={voted}
                                onChange={() => setSelectedOption(opcao.id)}
                            />
                            {opcao.texto}
                            {voted && <span> — {opcao.votos} votos</span>}
                        </label>
                    </div>
                ))}
            </div>
            {!voted && user && (
                <button onClick={handleVote} disabled={!selectedOption}>
                    Votar
                </button>
            )}
            {voted && <div>Obrigado pelo teu voto!</div>}
        </div>
    );
}

export default Vote;
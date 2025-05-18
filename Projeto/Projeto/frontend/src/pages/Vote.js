import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { userService, voteService } from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import "../styles/Vote.css";

function Vote() {
    const { id } = useParams();
    const { user } = useAuth();
    const [vote, setVote] = useState(null);
    const [opcoes, setOpcoes] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [username, setUsername] = useState(null);
    const [voted, setVoted] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const voteRes = await voteService.getById(id);
                setVote(voteRes.data);
                
                const optionsRes = await voteService.getOptions(id);
                setOpcoes(optionsRes.data);

                if (user) {
                    const userRes = await userService.getProfile();
                    const username = userRes.data.username;
                    setUsername(username);
                    
                    // Verificar se o usuário está na lista de votantes
                    if (voteRes.data.votantes && voteRes.data.votantes.includes(username)) {
                        setVoted(true);
                        // Atualizar as opções para mostrar os votos
                        const updatedOptions = await voteService.getOptions(id);
                        setOpcoes(updatedOptions.data);
                    }
                }
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
            }
        };

        fetchData();
    }, [id, user]);

    const handleVote = async () => {
        if (!selectedOption) return;
        try {
            console.log('Enviando voto para opção:', selectedOption);
            const response = await voteService.submitVote(id, selectedOption);
            console.log('Resposta do voto:', response.data);
            
            setVoted(true);
            const res = await voteService.getById(id);
            setVote(res.data);
            const opcoesRes = await voteService.getOptions(id);
            setOpcoes(opcoesRes.data);
        } catch (error) {
            console.error('Erro ao votar:', error.response?.data || error.message);
            alert(error.response?.data?.error || 'Erro ao processar voto');
        }
    };

    if (!vote) return <div>A carregar votação...</div>;

    return (
        <div className="vote-container">
            <h2>{vote.votacao_texto}</h2>
            <div>
                {opcoes.map(opcao => (
                    <div key={opcao.id} className="vote-option">
                        <label>
                            <input
                                type="radio"
                                name="opcao"
                                value={opcao.id}
                                disabled={voted || !user}
                                onChange={() => setSelectedOption(opcao.id)}
                            />
                            {opcao.opcao_texto}
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
            {voted && <div className="voted-message">Obrigado pelo teu voto!</div>}
        </div>
    );
}

export default Vote;
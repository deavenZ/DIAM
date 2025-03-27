import { useState } from "react"
import { useNavigate } from "react-router-dom";
import Artistas from "./Artistas.json"

function Inquerito() {

    const navigate = useNavigate();

    const [inqData, setInqData] = useState({
        artistas: [],
        horario: "",
        comentario: "",
    });

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setInqData({ ...inqData, [name]: value });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        navigate("/inquerito/confirmacao", { state: { artistas: inqData.artistas, horario: inqData.horario, comentario: inqData.comentario } });
    };



    return (
        <>
            <form onSubmit={submitHandler}>
                <label>Artistas Preferidos: </label>
                {Artistas.map((artista, index) => (
                    <label key={index}>
                        <input name="artistas" type="checkbox" value={artista.nome} onChange={changeHandler} />
                        {artista.nome}
                    </label>
                ))}
                <br /> 

                <label>Horários Preferidos: </label>
                <select name="horario" onChange={changeHandler}>
                    <option value="">Selecione um horário</option>
                    <option value="18h">18h</option>
                    <option value="20h">20h</option>
                    <option value="22h">22h</option>
                </select>
                <br />

                <label>Comentário: </label>
                <textarea name="comentario" onChange={changeHandler} />
                <br />

                <button type="submit">Submeter Inquérito</button>
            </form>
        </>


    );
}

export default Inquerito;
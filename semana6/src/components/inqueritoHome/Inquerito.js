import { useState } from "react"
import { useNavigate } from "react-router-dom";
import Artistas from "./Artistas.json"
import './Inquerito.css';

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
        <div className="form-container">
          <form onSubmit={submitHandler}>
        
        <label>Artistas Preferidos:</label>
            <div className="quadrado">
              {Artistas.map((artista, index) => (
                <label key={index} className="checkbox-label">
                  <input type="checkbox" name="artistas" value={artista.nome} onChange={changeHandler}/>
                  {artista.nome}
                </label>
              ))}
            </div>
    
            <label>Horários Preferidos:</label>
              <div className="quadrado">
              <select name="horario" onChange={changeHandler}>
                <option value="">Selecione um horário</option>
                <option value="18h">18h</option>
                <option value="20h">20h</option>
                <option value="22h">22h</option>
              </select>
            </div>
    
            
            <label>Comentário:</label>
              <div className="quadrado-comentario">
              <textarea name="comentario" onChange={changeHandler} />
            </div>
              <button type="submit">Submeter Inquérito</button>
            
    
          </form>
        </div>
      );    
    
}

export default Inquerito;
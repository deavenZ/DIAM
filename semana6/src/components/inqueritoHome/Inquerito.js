import { useState } from "react"
import { useNavigate } from "react-router-dom";
import Artistas from "./Artistas.json"
import './inquerito.css';

function Inquerito() {

  const navigate = useNavigate();

  const [inqData, setInqData] = useState({
    artistas: [],
    horario: "",
    critica: "",
  });

  const changeHandler = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setInqData((prev) => {
        const newArtistas = checked
          ? [...prev.artistas, value] // Adiciona artista se marcado
          : prev.artistas.filter((artista) => artista !== value); // Remove se desmarcado

        return { ...prev, artistas: newArtistas };
      });
    } else {
      setInqData({ ...inqData, [name]: value });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (inqData.artistas.length === 0) {
      alert("Por favor, selecione pelo menos um artista.");
      return;
    }

    navigate("/inquerito/confirmacao", { state: { artistas: inqData.artistas, horario: inqData.horario, critica: inqData.critica } });
  };



  return (
    <div className="inquerito-container">
      <form onSubmit={submitHandler}>

        <label>Artistas Preferidos:</label>
        <div className="quadrado">
          {Artistas.map((artista, index) => (
            <label key={index} className="checkbox-label">
              <input type="checkbox" name="artistas" value={artista.nome} onChange={changeHandler} />
              {artista.nome}
            </label>
          ))}
        </div>

        <br />

        <label>Horários Preferidos:</label>
        <div className="quadrado">
          <select name="horario" onChange={changeHandler} required>
            <option value="">Selecione um horário</option>
            <option value="18h">18h</option>
            <option value="20h">20h</option>
            <option value="22h">22h</option>
          </select>
        </div>

        <br />

        <label>Criticas (o que não correu bem no festival):</label>
        <div className="quadrado-comentario">
          <textarea name="critica" onChange={changeHandler}/>
        </div>
        <button type="submit">Submeter Inquérito</button>


      </form>
    </div>
  );

}

export default Inquerito;
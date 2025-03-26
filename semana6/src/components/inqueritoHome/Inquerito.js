import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

function Inquerito() {

    const navigate = useNavigate();


    const [ArtistasPref, setArtistasPref] = UseState([]);
    const [HorarioPref, setHorarioPref] = UseState();
    const [Comentario, setComentario] = UseState();


    return(
        <section>
            <br></br>




        </section>

        <button onClick={() => navigate("../pages/Conf.js")}>Submeter Inquérito</button>;


    );
}

export default Inquerito;
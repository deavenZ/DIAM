import { useState } from "react";
import "./formVoluntariado.css"

function FormVoluntariado() {

    const [data, setData] = useState({ nome: "", telefone: "", email: "", comentario: "" });
    
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

    const palavrasMas = [
        "abecula", "abentesma", "achavascado", "alimaria", "andrajoso", "barrega", "biltre",
        "cacostomo", "cuarra", "estolido", "estroso", "estultiloquio", "nefelibata", "nescio", 
        "pechenga", "sevandija", "somitico", "tatibitate", "xexe", "cheche", "xexelento"
    ];

    const changeHandler = (e) => {
        const {name, value} = e.target;
        setData({ ...data, [name]: value });

        if (name === "comentario") {
            const hasPalavraMa = palavrasMas.some(palavra => value.toLowerCase().includes(palavra.toLowerCase()));
            setIsSubmitDisabled(hasPalavraMa);
          }
    };


    const submitHandler = (e) => {
        e.preventDefault();
        alert("Obrigado " + data.nome + " pela sua inscrição, em breve será contactado pela organização do festival!");
        window.location.href = '/';
    };

    return (
        <div className="form-container">
            <form onSubmit={submitHandler}>
                <label>Nome:</label><br /><input name="nome" type="text" value={data.nome} onChange={changeHandler} placeholder="Primeiro e Ultimo Nome" required autocomplete="off" /><br/>
                <label>Telefone:</label><br /><input name="telefone" type="tel" value={data.telefone} onChange={changeHandler} placeholder="9********" pattern="[9]{1}[0-9]{8}" required autocomplete="off" /><br/>
                <label>Email:</label><br /><input id="email" name="email" type="email" value={data.email} onChange={changeHandler} placeholder="exemplo@dominio.com" required autoComplete="off" /><br/>
                <label>Comentario:</label><br /><textarea id="comentario" name="comentario" value={data.comentario} onChange={changeHandler} placeholder="Deixe um comentário" /><br/>
                <input type="submit" value="Submeter" disabled={isSubmitDisabled} className={isSubmitDisabled ? "disabled" : ""}/>
            </form>
        </div>
    );
}

export default FormVoluntariado;
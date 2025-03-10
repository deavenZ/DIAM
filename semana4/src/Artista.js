
function Artista(props) {

    return(
        <div>
            <p>Nome: {props.nome}</p>
            <p>Atuação: {props.data} ás {props.hora}</p>
            <p><img src={props.imagem}></img></p>
            <p>Estilo músical: {props.estilo}</p>
            <p>{props.descricao}</p>
        </div>
    );

}
export default Artista;
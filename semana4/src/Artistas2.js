import Artistas from './Artistas.json'

function Artista2() {

    const showVideo = (index) => {
        const video = document.getElementById("video" + index);
        if(video && video.style.display == "none") {
            video.style.display = "block";
        } else {
            video.style.display = "none";
        }
    }

    return(
        <div>
            {Artistas.map((artista, index) => (
                <div key={index} align="center">
                    <hr></hr>
                    <p>Nome: {artista.nome}</p>
                    <p>Atuação: {artista.data} ás {artista.hora}</p>
                    <p><img src={artista.imagem} style={{ cursor: 'pointer' }} onClick={() => showVideo(index)}></img></p>
                    <iframe 
                        width="560" 
                        height="315" 
                        src={artista.urlvideo} 
                        id={"video" + index}
                        style={{display: "none" }}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                    <p>Estilo músical: {artista.estilo}</p>
                    <p>{artista.descricao}</p>
                </div>
            ))}
        </div>
    );

}
export default Artista2;
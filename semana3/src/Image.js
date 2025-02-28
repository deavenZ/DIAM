import { useEffect, useRef } from "react";

function Image() {

    const figcaptionStyle = {
        color: "white"
    };
    const imageRef = useRef(null);

    useEffect(() => {
        const imagem = imageRef.current;

        if (!imagem) return;

        const handleMouseOver = () => {
            imagem.style.opacity = "0";
        };

        const handleMouseOut = () => {
            imagem.style.opacity = "1";
        };

        imagem.addEventListener("mouseover", handleMouseOver);
        imagem.addEventListener("mouseout", handleMouseOut);

    }, []);

    return (
        <section>
            <br></br>
            <a href="https://www.festivalvilardemouros.pt" target="_blank" ref={imageRef} style={{transition: "1s"}}>
                <img src="/images/img1.png" width="400" height="auto"></img>
                <br></br>
                <figcaption style={figcaptionStyle} > Fig. 1 - Cartaz do Festival </figcaption>
            </a>
            <br></br>
        </section>
    );
}
export default Image;
import React, { useState } from "react";
import "./Slideshow.css";

function Slideshow() {

    const [imgId, setImgId] = useState(1); // State to track the current image ID

    const slideshow = (direction) => {
        setImgId((prevId) => {
            if (direction === 1) {
                return prevId === 3 ? 1 : prevId + 1;
            } else {
                return prevId === 1 ? 3 : prevId - 1;
            }
        });
    };

    return (
        <section class="slideshowsection">
            <a class="prev" onClick={() => slideshow(-1)}>&#10094;</a>
            <img src={`images/vmfoto${imgId}.jpg`} id="imageSlide" class="imageSlide"></img>
            <a class="next" onClick={() => slideshow(-1)}>&#10095;</a>
        </section>
    );
}

export default Slideshow;
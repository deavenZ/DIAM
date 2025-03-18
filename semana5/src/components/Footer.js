import { useState } from "react";
import "./footer.css"

function Footer() {

    const [showAuthors, setShowAuthors] = useState(false);

    const toggleFooter = () => {
        setShowAuthors(!showAuthors);
    };

    return (
        <footer onClick={toggleFooter}>
            {showAuthors ? (
                <p>Autores: João Antunes, Rafael Lopes</p>
            ) : (
            <p> 
                E-mail: <a href="mailto:festivalvilardemouros@gmail.com"> festivalvilardemouros@gmail.com</a>
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                Telefone: <a href="tel:217696969"> 217696969 </a>
            </p>
            )}
        </footer>
    );
}

export default Footer;
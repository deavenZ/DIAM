function Footer() {

    const linksStyle = {
        color: "#87CEEB"
    };

    const footerStyle = {
            backgroundColor: "#18945c",
            position: "absolute",
            bottom: 0,
            width: "100%",
            padding: "20px"
    }

    return (
        <footer style={footerStyle}>
        <br></br>
        <p style={{color: "white"}}> E-mail: <a href="mailto:festivalvilardemouros@gmail.com" style={linksStyle}> festivalvilardemouros@gmail.com</a>
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; Telefone: <a href="tel:217696969" style={linksStyle}>
                217696969 </a></p>
        <br></br>
        </footer>
    );
}

export default Footer;
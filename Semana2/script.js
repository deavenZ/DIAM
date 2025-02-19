
document.addEventListener("DOMContentLoaded", function () {
    function hideImage() {
        var image = document.getElementById('imagem');

        image.addEventListener("mouseover", function () {
            image.style.opacity = "0";
        });

        image.addEventListener("mouseout", function () {
            image.style.opacity = "1";
        });
    }

    hideImage();
});

function verifyComment() {

    const palavrasmas = [
        "abecula", "abentesma", "achavascado", "alimaria", "andrajoso", "barrega", "biltre",
        "cacostomo", "cuarra", "estolido", "estroso", "estultiloquio", "nefelibata", "nescio", 
        "pechenga", "sevandija", "somitico", "tatibitate", "xexe", "cheche", "xexelento"
    ];

    var commentSection = document.getElementById('comment');

    var commentText = commentSection.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    console.log("Got: " + commentText);

    for (const palavra of palavrasMas) {
        if (commentText.includes(palavra)) {
            commentSection.value = "";
            alert("Não pode utilizar a palavra " + palavra);
            return;
        }
    }
}
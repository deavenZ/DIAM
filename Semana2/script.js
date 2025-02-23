
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

var submitEnabled = false;

function verifySubmit() {

    var commentSection = document.getElementById('comment');
    var warningMessage = document.getElementById('commentWarning');

    if (commentSection.value.trim() !== ""){
        if(!submitEnabled) {
            commentSection.style.border = "2px solid red"; 
            warningMessage.innerText = `Ainda não verificou o comentário!`;
            warningMessage.style.display = "block";
            return false
        }
    }
    commentSection.style.border = "";
    warningMessage.style.display = "none";
    return true;
}

function verifyComment() {

    const palavrasMas = [
        "abecula", "abentesma", "achavascado", "alimaria", "andrajoso", "barrega", "biltre",
        "cacostomo", "cuarra", "estolido", "estroso", "estultiloquio", "nefelibata", "nescio", 
        "pechenga", "sevandija", "somitico", "tatibitate", "xexe", "cheche", "xexelento"
    ];

    var commentSection = document.getElementById('comment');
    var warningMessage = document.getElementById('commentWarning');

    var commentText = commentSection.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    for (const palavra of palavrasMas) {
        if (commentText.includes(palavra)) {
            commentSection.value = "";
            commentSection.style.border = "2px solid red";  
            warningMessage.innerText = `A palavra "${palavra}" não é permitida!`;
            warningMessage.style.display = "block";
            submitEnabled = false;
            return;
        }
    }
    commentSection.style.border = "";
    warningMessage.style.display = "none";
    submitEnabled = true;    
}

var imgId = 1

function slideshow(nextOrBefore) {

    var imageSlide = document.getElementById('imageSlide');

    if(nextOrBefore == 1) {
        if(imgId !== 3) {
            imgId++;
        } else {
            imgId = 1;
        }
    } else {
        if(imgId !== 1) {
            imgId--;
        } else {
            imgId = 3;
        }
    }
    imageSlide.src = "vmfoto" + imgId + ".jpg";
}
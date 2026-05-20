    const perguntas = document.querySelectorAll('.perguntas');

perguntas.forEach((pergunta) => {

    pergunta.addEventListener('click', function() {
        const resposta = this.nextElementSibling;

        if (resposta.style.display === "none" || resposta.style.display === "") {
            resposta.style.display = "block";
        } else {
            resposta.style.display = "none";
        }
    });

});
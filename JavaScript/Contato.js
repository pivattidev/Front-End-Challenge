const formulario = document.querySelector('.formulario-texto');
const btnEnviar = formulario.querySelector('button[type="submit"]');

formulario.addEventListener('submit', function (event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    // Remove aviso anterior se existir
    const avisoExistente = document.querySelector('.aviso-erro');
    if (avisoExistente) avisoExistente.remove();

    // Validação simples
    if (!nome || !email || !mensagem) {
        mostrarAviso('Por favor, preencha todos os campos.', 'erro');
        return;
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValido) {
        mostrarAviso('Por favor, insira um e-mail válido.', 'erro');
        return;
    }

    // Simula envio com loading no botão
    btnEnviar.disabled = true;
    btnEnviar.textContent = 'Enviando...';

    setTimeout(() => {
        // Esconde o formulário e mostra mensagem de sucesso
        formulario.innerHTML = `
            <div class="sucesso-container">
                <div class="sucesso-icone">✓</div>
                <h3 class="sucesso-titulo">Mensagem enviada!</h3>
                <p class="sucesso-texto">Obrigado, <strong>${nome}</strong>! Sua mensagem foi recebida. Entraremos em contato pelo e-mail <strong>${email}</strong> em breve.</p>
                <button class="btn-nova-mensagem" onclick="location.reload()">Enviar outra mensagem</button>
            </div>
        `;
    }, 1200);
});

function mostrarAviso(texto, tipo) {
    const aviso = document.createElement('p');
    aviso.className = 'aviso-erro';
    aviso.textContent = texto;
    formulario.insertBefore(aviso, btnEnviar);
}
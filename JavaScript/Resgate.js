const formulario = document.querySelector('.form-resgate');
const tokenCard = document.querySelector('.token-card');
const tokenInfo = document.querySelector('.token-info');
const tokenStatus = document.querySelector('.token-status');

// Oculta a seção de token ao carregar a página
tokenCard.style.display = 'none';

function gerarToken() {
    const ano = new Date().getFullYear();
    const aleatorio = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `TKN-${ano}-${aleatorio}`;
}

formulario.addEventListener('submit', function(event) {
    event.preventDefault();

    const pontos = document.getElementById('pontos').value;
    const cartao = document.getElementById('cartao').value;

    if (!pontos || pontos <= 0) {
        alert('Por favor, insira uma quantidade válida de pontos.');
        return;
    }

    if (!cartao.trim()) {
        alert('Por favor, informe o cartão de transporte.');
        return;
    }

    if (parseInt(pontos) > 1500) {
        alert('Saldo insuficiente! Você possui apenas 1500 pontos.');
        return;
    }

    const tokenGerado = gerarToken();
    const creditos = (parseInt(pontos) / 100).toFixed(2);

    // Atualiza o token e o status na tela
    tokenInfo.textContent = tokenGerado;
    tokenStatus.textContent = `Status: ativo — R$ ${creditos} creditados em "${cartao}"`;

    // Exibe a seção do token com animação
    tokenCard.style.display = 'flex';
    tokenCard.classList.add('token-visivel');

    // Scroll suave até o token
    tokenCard.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Inicia contagem regressiva de 24h (exibida em segundos para demo)
    iniciarContagem();
});

function iniciarContagem() {
    const expiracao = document.querySelector('.token-expiracao');
    // 24 horas em milissegundos
    let tempoRestante = 24 * 60 * 60;

    function atualizar() {
        const horas = Math.floor(tempoRestante / 3600);
        const minutos = Math.floor((tempoRestante % 3600) / 60);
        const segundos = tempoRestante % 60;
        expiracao.textContent = `Expira em: ${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;

        if (tempoRestante <= 0) {
            expiracao.textContent = 'Token expirado.';
            tokenInfo.style.opacity = '0.4';
            clearInterval(intervalo);
            return;
        }
        tempoRestante--;
    }

    atualizar();
    const intervalo = setInterval(atualizar, 1000);
}
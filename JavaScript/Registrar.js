const inputNome    = document.querySelector('input[name="nome"]');
const inputSenha   = document.querySelector('input[name="senha"]');
const inputEmail   = document.querySelector('input[name="email"]');
const inputNumero  = document.querySelector('input[name="numero"]');
const btnRegistrar = document.querySelector('button[type="submit"]');
 
btnRegistrar.addEventListener('click', function () {
  const nome   = inputNome.value.trim();
  const senha  = inputSenha.value.trim();
  const email  = inputEmail.value.trim();
  const numero = inputNumero.value.trim();
 
  if (!nome || !senha || !email || !numero) {
    mostrarToast('Preencha todos os campos!', 'erro');
    return;
  }
  if (senha.length < 6) {
    mostrarToast('A senha precisa ter pelo menos 6 caracteres!', 'erro');
    return;
  }
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailValido) {
    mostrarToast('Digite um e-mail válido!', 'erro');
    return;
  }
 
  const usuarios = JSON.parse(localStorage.getItem('passup_usuarios')) || [];
  const jaExiste = usuarios.some(u => u.email === email);
  if (jaExiste) {
    mostrarToast('Esse e-mail já está cadastrado!', 'erro');
    return;
  }
 
  const novoUsuario = { nome, senha, email, numero, pontos: 100 };
  usuarios.push(novoUsuario);
  localStorage.setItem('passup_usuarios', JSON.stringify(usuarios));
 
  mostrarPontos(100, nome);
 
  inputNome.value = inputSenha.value = inputEmail.value = inputNumero.value = '';
 
  setTimeout(() => { window.location.href = './Login.html'; }, 2500);
});
 
function mostrarToast(texto, tipo) {
  document.querySelector('.passup-toast')?.remove();
  const toast = document.createElement('div');
  toast.className = 'passup-toast ' + tipo;
  toast.textContent = texto;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('visivel'));
  setTimeout(() => {
    toast.classList.remove('visivel');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}
 
function mostrarPontos(qtd, nome) {
  const overlay = document.createElement('div');
  overlay.className = 'passup-overlay';
  overlay.innerHTML = `
    <div class="passup-card">
      <div class="passup-emoji">🎉</div>
      <h2>Bem-vindo, ${nome}!</h2>
      <p>Cadastro realizado com sucesso.</p>
      <span class="passup-pontos">+${qtd} pontos</span>
      <p class="passup-redirect">Redirecionando para o login...</p>
    </div>
  `;
  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('visivel'));
}
 
const s = document.createElement('style');
s.textContent = `
  .passup-toast {
    position: fixed; bottom: 1.5rem; left: 50%;
    transform: translateX(-50%) translateY(20px);
    background: #e74c3c; color: #fff;
    padding: .7rem 1.4rem; border-radius: 8px;
    font-size: .93rem; opacity: 0;
    transition: opacity .3s, transform .3s;
    z-index: 9999; box-shadow: 0 4px 14px rgba(0,0,0,.2);
  }
  .passup-toast.visivel { opacity:1; transform:translateX(-50%) translateY(0); }
  .passup-overlay {
    position:fixed; inset:0; background:rgba(0,0,0,.55);
    display:flex; align-items:center; justify-content:center;
    z-index:9999; opacity:0; transition:opacity .4s;
  }
  .passup-overlay.visivel { opacity:1; }
  .passup-card {
    background:#fff; border-radius:16px; padding:2.5rem 3rem; text-align:center;
    box-shadow:0 8px 32px rgba(0,0,0,.2); transform:scale(.85);
    transition:transform .4s cubic-bezier(.34,1.56,.64,1);
  }
  .passup-overlay.visivel .passup-card { transform:scale(1); }
  .passup-emoji { font-size:3rem; margin-bottom:.4rem; }
  .passup-card h2 { margin:0 0 .3rem; color:#222; font-size:1.4rem; }
  .passup-card p  { margin:0; color:#666; font-size:.9rem; }
  .passup-pontos  { display:block; font-size:2.4rem; font-weight:800; color:#27ae60; margin:.5rem 0; }
  .passup-redirect { margin-top:.8rem !important; color:#aaa !important; font-size:.8rem !important; }
`;
document.head.appendChild(s);
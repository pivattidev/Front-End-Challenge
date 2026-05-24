const inputNome  = document.querySelector('input[name="nome"]');
const inputSenha = document.querySelector('input[name="senha"]');
const btnLogar   = document.querySelector('button[type="submit"]');

btnLogar.addEventListener('click', function () {
  const nome  = inputNome.value.trim();
  const senha = inputSenha.value.trim();

  if (!nome || !senha) {
    mostrarToast('Preencha todos os campos!', 'erro');
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem('passup_usuarios')) || [];

  const usuario = usuarios.find(u => u.nome === nome && u.senha === senha);

  if (!usuario) {
    mostrarToast('Nome de usuário ou senha incorretos!', 'erro');
    return;
  }

  localStorage.setItem('passup_logado', JSON.stringify(usuario));

  mostrarBoasVindas(usuario.nome, usuario.pontos);

  setTimeout(() => { window.location.href = '../index.html'; }, 2500);
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

function mostrarBoasVindas(nome, pontos) {
  const overlay = document.createElement('div');
  overlay.className = 'passup-overlay';
  overlay.innerHTML = `
    <div class="passup-card">
      <div class="passup-emoji">👋</div>
      <h2>Bem-vindo de volta, ${nome}!</h2>
      <p>Login realizado com sucesso.</p>
      <span class="passup-pontos">${pontos} pontos</span>
      <p class="passup-redirect">Redirecionando...</p>
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
  .passup-pontos  { display:block; font-size:2.4rem; font-weight:800; color:#4571ff; margin:.5rem 0; }
  .passup-redirect { margin-top:.8rem !important; color:#aaa !important; font-size:.8rem !important; }
`;
document.head.appendChild(s);
// ==========================================================================
// SYRIUS CLI — Interactive Documentation Scripts
// ==========================================================================

// 1. Toast Notification & Copying
function copyText(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`Comando copiado: "${text}"`);
  }).catch(() => {
    showToast('Falha ao copiar comando!');
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (toast) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }
}

// 2. Real-time Documentation Filtering / Search
function filterDocs() {
  const query = document.getElementById('cmd-search').value.toLowerCase().trim();
  const blocks = document.querySelectorAll('.doc-block');

  blocks.forEach((block) => {
    const text = block.textContent.toLowerCase();
    if (!query || text.includes(query)) {
      block.style.display = 'block';
    } else {
      block.style.display = 'none';
    }
  });
}

// 3. Interactive Playground Simulator
function updatePlayground() {
  const category = document.getElementById('pg-category').value;
  const name = document.getElementById('pg-name').value || 'UserProfile';
  const isTs = document.getElementById('pg-ts').value === 'true';
  const terminal = document.getElementById('pg-terminal');
  const tsGroup = document.getElementById('pg-ts-group');

  if (category === 'react') {
    tsGroup.style.display = 'flex';
  } else {
    tsGroup.style.display = 'none';
  }

  const formattedName = name[0].toUpperCase() + name.substring(1);
  let cmd = '';
  let lines = [];

  if (category === 'react') {
    const ext = isTs ? 'tsx' : 'jsx';
    cmd = `syrius generate:component ${formattedName}${isTs ? ' --ts' : ''}`;
    lines = [
      `<div class="line"><span class="t-green">yago@dev</span>:<span class="t-blue">~/meu-projeto</span>$ ${cmd}</div>`,
      `<div class="line t-green">✨ COMPONENT React (${isTs ? 'TypeScript' : 'JavaScript'}) criado com sucesso!</div>`,
      `<div class="line t-dim">📁 Arquivo principal: src/components/${formattedName}/index.${ext}</div>`,
      `<div class="line t-dim">🎨 Arquivo de estilo: src/components/${formattedName}/styles.module.css</div>`,
      `<div class="line"><span class="t-green">yago@dev</span>:<span class="t-blue">~/meu-projeto</span>$ <span class="blink">_</span></div>`,
    ];
  } else if (category === 'docker') {
    cmd = `syrius docker --type react`;
    lines = [
      `<div class="line"><span class="t-green">yago@dev</span>:<span class="t-blue">~/meu-projeto</span>$ ${cmd}</div>`,
      `<div class="line t-green">🐳 Dockerfile e docker-compose.yml criados com sucesso!</div>`,
      `<div class="line t-dim">📌 Porta configurada: 80 (Nginx Production)</div>`,
      `<div class="line t-cyan">💡 Execute: docker-compose up --build para iniciar!</div>`,
      `<div class="line"><span class="t-green">yago@dev</span>:<span class="t-blue">~/meu-projeto</span>$ <span class="blink">_</span></div>`,
    ];
  } else if (category === 'git') {
    cmd = `syrius git readme --name "${name}" --author "Dev"`;
    lines = [
      `<div class="line"><span class="t-green">yago@dev</span>:<span class="t-blue">~/meu-projeto</span>$ ${cmd}</div>`,
      `<div class="line t-green">✨ Generated README.md para ${name}</div>`,
      `<div class="line t-dim">📄 README.md formatado com sucesso!</div>`,
      `<div class="line"><span class="t-green">yago@dev</span>:<span class="t-blue">~/meu-projeto</span>$ <span class="blink">_</span></div>`,
    ];
  } else if (category === 'web') {
    cmd = `syrius pageweb advanced --name "${name}"`;
    lines = [
      `<div class="line"><span class="t-green">yago@dev</span>:<span class="t-blue">~/meu-projeto</span>$ ${cmd}</div>`,
      `<div class="line t-green">✨ Generated ${name} advanced</div>`,
      `<div class="line t-dim">📁 src/${name}/index.html</div>`,
      `<div class="line t-dim">🎨 src/${name}/styles.css</div>`,
      `<div class="line t-dim">📜 src/${name}/scripts.js</div>`,
      `<div class="line t-dim">📄 src/${name}/about.html</div>`,
      `<div class="line"><span class="t-green">yago@dev</span>:<span class="t-blue">~/meu-projeto</span>$ <span class="blink">_</span></div>`,
    ];
  }

  terminal.innerHTML = lines.join('');
  terminal.dataset.cmd = cmd;
}

function copyPlaygroundCmd() {
  const terminal = document.getElementById('pg-terminal');
  if (terminal && terminal.dataset.cmd) {
    copyText(terminal.dataset.cmd);
  }
}

// 4. Scrollspy Navigation & Back to Top Button
window.addEventListener('scroll', () => {
  const arrowTop = document.getElementById('arrow-top');
  if (window.scrollY > 300) {
    arrowTop.classList.add('visible');
  } else {
    arrowTop.classList.remove('visible');
  }

  // Scrollspy
  const sections = document.querySelectorAll('.doc-block');
  const navLinks = document.querySelectorAll('.sidebar-link');

  let current = '';
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  updatePlayground();
});
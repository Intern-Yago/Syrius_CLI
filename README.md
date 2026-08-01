# 🚀 Syrius CLI

> Ferramenta CLI moderna, ágil e completa para desenvolvedores. Gere componentes React (JS/TS), projetos Web, arquivos Git, Dockerfiles e pipelines de CI/CD em segundos.

[![npm version](https://img.shields.io/badge/npm-v0.2.0-blue.svg)](https://www.npmjs.com/package/syrius)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

---

## ⚡ Instalação

Instale globalmente via npm:

```bash
npm install -g syrius
```

---

## 🧙‍♂️ Modo Interativo (Wizard)

Basta rodar o comando sem argumentos para abrir o assistente interativo com **navegação contínua** (digite `:q` a qualquer momento para voltar ao menu principal):

```bash
syrius init
# ou simplesmente
syrius
```

---

## 📖 Comandos e Uso

### ⚛️ React (JS / TypeScript)
Gere componentes e páginas prontos com CSS Modules ou Styled Components:

```bash
# Componente React com TypeScript
syrius generate:component Button --ts

# Página React com TypeScript
syrius generate:page Dashboard --ts

# Aliases curtos
syrius gc Header --ts
syrius gp Profile
```

---

### 🌐 Páginas Web (HTML5 + CSS + JS)
Configure a estrutura base de sites web rapidamente:

```bash
# Estrutura simples (index.html + styles.css)
syrius pageweb simple --name "meu-site"

# Estrutura completa (index.html + styles.css + scripts.js + about.html)
syrius pageweb advanced --name "meu-site-completo"
```

---

### 📦 Arquivos Git
Gere os arquivos fundamentais de repositório:

```bash
# Gera .gitignore (detecta Node.js ou Python automaticamente)
syrius git ignore

# Gera README.md formatado
syrius git readme --name "NomeDoProjeto" --author "SeuNome"

# Gera licença open-source (MIT, APACHE, GNU, ISC)
syrius git license MIT
```

---

### 🐳 Docker & CI/CD
Gere configurações prontas para containerização e automação no GitHub:

```bash
# Gera Dockerfile e docker-compose.yml
syrius docker --type react

# Gera pipeline de CI/CD do GitHub Actions (.github/workflows/ci.yml)
syrius ci
```

---

### 📱 PWA (Progressive Web Apps)
Gere Service Worker, Web App Manifest e Favicons:

```bash
syrius pwa generate --name "MinhaAppPWA"
```

---

## 👤 Autor

Criado por **[@intern-yago](https://github.com/Intern-Yago)**

---

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE).

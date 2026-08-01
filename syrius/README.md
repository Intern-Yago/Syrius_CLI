# 🚀 Syrius CLI

> Ferramenta CLI moderna, ágil e completa para desenvolvedores. Gere componentes React (JS/TS), projetos Web, arquivos Git, Dockerfiles, pipelines de CI/CD e configurações em segundos.

[![npm version](https://img.shields.io/badge/npm-v0.2.1-blue.svg)](https://www.npmjs.com/package/syrius)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Node.js](https://img.shields.io/badge/Node.js->=14.0.0-green.svg)](https://nodejs.org)

---

## ⚡ Instalação

Instale a **Syrius CLI** globalmente via npm:

```bash
npm install -g syrius
```

---

## 🧙‍♂️ Modo Interativo (Wizard)

Basta executar o comando sem argumentos para abrir o **assistente interativo completo** com menu contínuo (digite `:q` a qualquer momento para retornar ao menu principal):

```bash
syrius init
# ou simplesmente
syrius
```

---

## 📖 Guia de Comandos

### ⚛️ Componentes e Páginas React (JS & TypeScript)
Gere arquivos de componentes e páginas formatados com CSS Modules:

```bash
# Componente React com TypeScript (.tsx + styles.module.css)
syrius gc Button --ts

# Página React com TypeScript (.tsx + styles.module.css)
syrius gp Dashboard --ts

# Criar em pasta específica
syrius gc Header src/components/Header --ts
```

### ⚙️ Templates Customizados da Equipe (`syrius config`)
Inicialize a pasta `.syrius/` no seu projeto para criar seus próprios modelos de código:

```bash
syrius config
```
> Toda vez que você executar `syrius gc <Nome>`, a CLI utilizará automaticamente os seus arquivos `.syrius/component.tsx.ejs` personalizados!

---

### 🔑 Variáveis de Ambiente (`syrius env`)
Gere o arquivo `.env.example` e adicione o `.env` ao `.gitignore` automaticamente:

```bash
syrius env
```

---

### 🛡️ Git Hooks & Linter (`syrius hook`)
Configure o Husky e o lint-staged no seu `package.json` em 1 segundo:

```bash
syrius hook
```

---

### 🔍 Diagnóstico do Projeto (`syrius info`)
Analise a saúde e o estado dos arquivos do seu projeto:

```bash
syrius info
# ou
syrius check
```

---

### 🐳 Docker & Containerização (`syrius docker`)
Gere um `Dockerfile` otimizado e um `docker-compose.yml` prontos para produção:

```bash
# Para React / Single Page App (Nginx)
syrius docker --type react

# Para API Node.js / Express
syrius docker --type node --port 4000
```

---

### ⚙️ CI/CD com GitHub Actions (`syrius ci`)
Crie a pipeline de testes, lint e build em `.github/workflows/ci.yml`:

```bash
syrius ci
```

---

### 📦 Arquivos Git (`.gitignore`, `README.md`, `LICENSE`)
Gere os arquivos essenciais de repositório:

```bash
# .gitignore automático (detecta Node.js ou Python)
syrius git ignore

# README.md profissional
syrius git readme --name "MeuProjeto" --author "SeuNome"

# Licença open-source (MIT, APACHE, GNU, ISC)
syrius git license MIT
```

---

### 📱 PWA (Progressive Web Apps)
Gere Service Worker, Web App Manifest e Favicons:

```bash
syrius pwa generate --name "MinhaAppPWA"
```

---

### 📖 Manual do Terminal (man page)
Exiba o manual completo diretamente no terminal:

```bash
syrius man
```

---

## 👤 Autor

Desenvolvido por **[Yago Victor (@intern-yago)](https://github.com/Intern-Yago)**

---

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE).

module.exports = {
  name: 'env',
  alias: ['dotenv'],
  description: 'Gera e configura o arquivo .env.example e garante a inclusão no .gitignore',
  run: async (toolbox) => {
    const { prompt, filesystem, print: { success, info, warning } } = toolbox

    info('🔑 Gerador de Arquivo de Variáveis de Ambiente (.env.example)\n')

    const { vars } = await prompt.ask({
      type: 'input',
      name: 'vars',
      message: 'Informe as chaves de variáveis de ambiente separadas por vírgula (ou pressione Enter para o padrão):',
      initial: 'PORT, NODE_ENV, DATABASE_URL, JWT_SECRET, API_URL',
    })

    const keys = vars.split(',').map((k) => k.trim()).filter(Boolean)

    let envContent = '# ==========================================================================\n'
    envContent += '# SYRIUS CLI — Configurações de Variáveis de Ambiente (.env.example)\n'
    envContent += '# ==========================================================================\n\n'

    keys.forEach((key) => {
      envContent += `# ${key}\n${key}=\n\n`
    })

    await filesystem.write('.env.example', envContent)
    success('✨ Arquivo .env.example gerado com sucesso!')

    // Proteção no .gitignore
    const hasGitignore = await filesystem.exists('.gitignore')
    if (hasGitignore) {
      const gitignore = await filesystem.read('.gitignore')
      if (!gitignore.includes('.env')) {
        await filesystem.append('.gitignore', '\n# Environment Variables\n.env\n.env.local\n')
        info('🛡️ Adicionado `.env` ao seu arquivo .gitignore para evitar vazamento de credenciais!')
      }
    } else {
      warning('⚠️ Recomendamos criar um .gitignore com `syrius git ignore` para proteger seu .env!')
    }
  },
}

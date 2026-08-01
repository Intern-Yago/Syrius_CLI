module.exports = {
  name: 'syrius',
  run: async (toolbox) => {
    const { print: { colors, info, table } } = toolbox

    const banner = `
  ███████╗██╗   ██╗██████╗ ██╗██╗   ██╗███████╗    ██████╗██╗     ██╗
  ██╔════╝╚██╗ ██╔╝██╔══██╗██║██║   ██║██╔════╝   ██╔════╝██║     ██║
  ███████╗ ╚████╔╝ ██████╔╝██║██║   ██║███████╗   ██║     ██║     ██║
  ╚════██║  ╚██╔╝  ██╔══██╗██║██║   ██║╚════██║   ██║     ██║     ██║
  ███████║   ██║   ██║  ██║██║╚██████╔╝███████║   ╚██████╗███████╗██║
  ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝ ╚═════╝ ╚══════╝    ╚═════╝╚══════╝╚═╝
  `

    info(colors.bold.cyan(banner))
    info(colors.bold.white(' ✨ Syrius CLI - Gerador de Arquivos e Boilerplates Dev (v0.2.0)\n'))

    info(colors.bold.yellow('📌 COMANDOS DISPONÍVEIS:\n'))

    table(
      [
        [colors.cyan('Comando'), colors.cyan('Alias'), colors.cyan('Descrição')],
        ['syrius init', 'create, new', 'Assistente interativo (Wizard) para escolher o que criar'],
        ['syrius generate:component', 'gc, component, c', 'Cria componente React (JS/TS + CSS Module)'],
        ['syrius generate:page', 'gp, page, p', 'Cria página React (JS/TS + CSS Module)'],
        ['syrius config', 'templates', 'Inicializa pasta .syrius/ com modelos customizados'],
        ['syrius env', 'dotenv', 'Gera .env.example e protege no .gitignore'],
        ['syrius hook', 'husky', 'Configura Husky + lint-staged em git pre-commit'],
        ['syrius info', 'check, status', 'Exibe o diagnóstico do projeto e do ambiente'],
        ['syrius docker', 'd, dockerfile', 'Gera Dockerfile e docker-compose.yml otimizados'],
        ['syrius ci', 'workflow, actions', 'Gera pipeline de CI/CD do GitHub Actions'],
        ['syrius git ignore', 'ignore, i', 'Gera arquivo .gitignore pré-configurado'],
        ['syrius git readme', 'readme, r', 'Gera arquivo README.md profissional'],
        ['syrius git license', 'license, l', 'Gera licença open-source (MIT, Apache, GPL, etc.)'],
        ['syrius man', 'doc, manual', 'Exibe o manual (man page) completo no terminal'],
      ],
      { format: 'markdown' }
    )

    info(colors.bold.yellow('\n💡 EXEMPLOS DE USO:\n'))
    info(colors.white('  $ syrius init'))
    info(colors.white('  $ syrius gc Header --ts'))
    info(colors.white('  $ syrius config'))
    info(colors.white('  $ syrius env'))
    info(colors.white('  $ syrius info'))
    info(colors.white('  $ syrius docker --type react\n'))

    info(colors.gray('Para mais informações, acesse a documentação oficial ou digite "syrius man".\n'))
  },
}
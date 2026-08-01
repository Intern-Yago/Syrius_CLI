module.exports = {
  name: 'info',
  alias: ['check', 'status', 'diagnose'],
  description: 'Exibe o diagnóstico completo do ambiente e dos arquivos do projeto atual',
  run: async (toolbox) => {
    const { filesystem, system, print: { info, colors, table } } = toolbox

    info(colors.bold.cyan('\n🔍 DIAGNÓSTICO DO PROJETO & AMBIENTE SYRIUS CLI\n'))

    let nodeVersion = process.version
    let platform = process.platform

    let pkg = null
    let isNode = await filesystem.exists('package.json')
    if (isNode) {
      pkg = await filesystem.read('package.json', 'json')
    }

    const hasGitignore = await filesystem.exists('.gitignore')
    const hasReadme = await filesystem.exists('README.md')
    const hasLicense = await filesystem.exists('LICENSE')
    const hasDocker = await filesystem.exists('Dockerfile')
    const hasCi = await filesystem.exists('.github/workflows/ci.yml')
    const hasEnv = await filesystem.exists('.env.example')
    const hasSyriusConfig = await filesystem.exists('.syrius')

    table([
      [colors.bold.white('Item'), colors.bold.white('Status / Valor')],
      ['Nome do Projeto', pkg ? pkg.name || 'Sem nome' : 'Não é um projeto Node.js'],
      ['Versão do Projeto', pkg ? pkg.version || '0.0.0' : '-'],
      ['Versão do Node.js', nodeVersion],
      ['Sistema Operacional', platform],
      ['Arquivo .gitignore', hasGitignore ? '✅ Presente' : '❌ Ausente (Use: syrius git ignore)'],
      ['Arquivo README.md', hasReadme ? '✅ Presente' : '❌ Ausente (Use: syrius git readme)'],
      ['Arquivo LICENSE', hasLicense ? '✅ Presente' : '❌ Ausente (Use: syrius git license)'],
      ['Dockerfile', hasDocker ? '✅ Presente' : '💡 Ausente (Use: syrius docker)'],
      ['GitHub Actions CI', hasCi ? '✅ Presente' : '💡 Ausente (Use: syrius ci)'],
      ['Variáveis .env.example', hasEnv ? '✅ Presente' : '💡 Ausente (Use: syrius env)'],
      ['Templates .syrius/', hasSyriusConfig ? '✅ Personalizado' : '💡 Padrão (Use: syrius config)'],
    ])

    info(colors.gray('\nDiagnóstico concluído com sucesso!\n'))
  },
}

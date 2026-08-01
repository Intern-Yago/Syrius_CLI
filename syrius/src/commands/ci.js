module.exports = {
  name: 'ci',
  alias: ['workflow', 'actions'],
  description: 'Gera pipeline de CI/CD do GitHub Actions (.github/workflows/ci.yml)',
  run: async (toolbox) => {
    const { template, print: { success, info } } = toolbox

    await template.generate({
      template: 'ci/github-ci.yml.ejs',
      target: '.github/workflows/ci.yml',
    })

    success('⚙️ Workflow de CI/CD (.github/workflows/ci.yml) criado com sucesso!')
    info('🚀 Suas builds, testes e linter serão executados automaticamente no GitHub em cada push!')
  },
}

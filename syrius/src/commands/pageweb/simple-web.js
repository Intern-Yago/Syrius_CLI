module.exports = {
  name: 'simple',
  alias: ['s'],
  description: 'Gera estrutura básica de site (index.html + styles.css)',
  run: async (toolbox) => {
    const { parameters, createWeb } = toolbox

    const name = parameters.options.name || parameters.first
    const path = parameters.options.path || parameters.second

    await createWeb(path, name, 'simple')
  },
}
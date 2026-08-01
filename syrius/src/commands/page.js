module.exports = {
  name: 'page',
  alias: ['gp', 'p'],
  description: 'Cria uma nova página React (JS/TS)',
  run: async (toolbox) => {
    const { parameters, createComponent } = toolbox

    const name = parameters.first || parameters.options.name
    const path = parameters.second || parameters.options.path
    const isTs = parameters.options.ts || parameters.options.typescript

    await createComponent(path, name, 'page', { ts: isTs })
  },
}

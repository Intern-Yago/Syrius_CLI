module.exports = {
  name: 'component',
  alias: ['gc', 'c'],
  description: 'Cria um novo componente React (JS/TS)',
  run: async (toolbox) => {
    const { parameters, createComponent } = toolbox

    const name = parameters.first || parameters.options.name
    const path = parameters.second || parameters.options.path
    const isTs = parameters.options.ts || parameters.options.typescript

    await createComponent(path, name, 'component', { ts: isTs })
  },
}

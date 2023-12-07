module.exports = {
  name: 'generate',
  alias: ['g'],
  run: async (toolbox) => {
    const {
      parameters,
      template,
      print: { info },
    } = toolbox

    const name = parameters.options.name

    await template.generate({
      template: 'model.js.ejs',
      target: `models/${name}-model.js`,
      props: { name },
    })

    info(`Generated file at models/${name}-model.js`)
  },
}

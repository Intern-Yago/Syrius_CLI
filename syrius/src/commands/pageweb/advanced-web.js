module.exports = {
  name: 'advanced',
  alias: ['adv'],
  description: 'Gera estrutura completa de site (HTML, CSS, JS, About)',
  run: async (toolbox) => {
    const { parameters, createWeb, template } = toolbox

    const name = parameters.options.name || parameters.first
    const path = parameters.options.path || parameters.second
    let targetScripts = ''
    let targetAbout = ''

    const response = await createWeb(path, name, 'advanced')
    if (response === 'error') return

    if (!path) {
      targetScripts = `src/${name}/scripts.js`
      targetAbout = `src/${name}/about.html`
    } else {
      if (path.includes('.html')) {
        targetScripts = path.slice(0, -4).replace('index.', 'scripts.js')
        targetAbout = path.replace('index.', 'about.')
      } else {
        targetAbout = `${path}/about.html`
        targetScripts = `${path}/scripts.js`
      }
    }

    await template.generate({
      template: 'advancedPage/scripts.js.ejs',
      target: targetScripts,
    })
    await template.generate({
      template: 'advancedPage/about.html.ejs',
      target: targetAbout,
      props: { name },
    })
  },
}
const { generateFilesEngine } = require('./generateFiles')

module.exports = (toolbox) => {
  const { print: { error } } = toolbox

  async function createWeb(path, name, type) {
    const isAdvanced = type === 'advanced'

    if (!name) {
      error('O nome precisa ser especificado!')
      return 'error'
    }

    let target = ''
    let targetStyle = ''

    if (!path || path === '.') {
      target = `src/${name}/index.html`
      targetStyle = `src/${name}/styles.css`
    } else {
      if (path.includes('.html')) {
        target = path
        targetStyle = path.slice(0, -5).concat('/styles.css')
      } else {
        target = `${path}/index.html`
        targetStyle = `${path}/styles.css`
      }
    }

    const filesToGenerate = [
      {
        template: isAdvanced ? 'advancedPage/index.html.ejs' : 'simplePage/index.html.ejs',
        target,
        props: { name },
      },
      {
        template: isAdvanced ? 'advancedPage/styles.css.ejs' : 'simplePage/styles.css.ejs',
        target: targetStyle,
        props: { name },
      },
    ]

    const engine = toolbox.generateFiles || generateFilesEngine
    await engine(toolbox, filesToGenerate)
  }

  toolbox.createWeb = createWeb
}
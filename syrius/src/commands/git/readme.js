const fs = require('fs')
var prompt = require('prompt-sync')()

module.exports = {
  name: 'readme',
  alias: ['r'],
  description: 'Gera arquivo README.md profissional',
  run: async (toolbox) => {
    const {
      parameters,
      template,
      print: { success, error, warning },
    } = toolbox

    function hasLicense() {
      return !!fs.existsSync('LICENSE')
    }

    const author = parameters.options.author
    const name = parameters.options.name
    var nameLicense = parameters.options.license || parameters.nameLicense

    if (!nameLicense) {
      if (hasLicense()) {
        nameLicense = prompt('Qual o nome da licença usada? ').trim()

        if (!nameLicense) {
          warning('Licença não informada... Continuando sem licença')
        }
      }
    }

    if (!name || !author) {
      error('O nome do projeto (--name) e o autor (--author) precisam ser especificados!')
      return
    }

    if (!nameLicense) {
      await template.generate({
        template: 'git/READMEw.md.ejs',
        target: 'README.md',
        props: { name, author },
      })
      success(`✨ README.md gerado com sucesso!`)
    } else {
      nameLicense = nameLicense.toUpperCase()
      await template.generate({
        template: 'git/README.md.ejs',
        target: 'README.md',
        props: { name, author, nameLicense },
      })
      success(`✨ README.md com licença ${nameLicense} gerado com sucesso!`)
    }
  },
}
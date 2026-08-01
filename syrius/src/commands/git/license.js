module.exports = {
  name: 'license',
  alias: ['l'],
  description: 'Gera licença open-source (MIT, APACHE, GNU, ISC)',
  run: async (toolbox) => {
    const {
      template,
      parameters,
      print: { success, error },
    } = toolbox

    const nameLicense = parameters.first?.toUpperCase()
    const licenses = ['MIT', 'ISC', 'GNU', 'APACHE']
    if (!nameLicense || licenses.indexOf(nameLicense) <= -1) {
      error('Qual licença deseja gerar?')
      console.log(`Licenças possíveis: ${licenses.join(', ')}`)
      console.log('Execute `syrius git list:license` para ver o resumo das licenças.')
      return
    }
    await template.generate({
      template: `git/licenses/${nameLicense}.ejs`,
      target: 'LICENSE',
    })
    success(`✨ Licença ${nameLicense} gerada com sucesso!`)
  },
}
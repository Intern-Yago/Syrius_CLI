module.exports = {
  name: 'help',
  alias: ['h'],
  description: 'Exibe o menu de ajuda completo e exemplos da Syrius CLI',
  run: async (toolbox) => {
    const defaultCmd = require('./syrius')
    await defaultCmd.run(toolbox)
  },
}

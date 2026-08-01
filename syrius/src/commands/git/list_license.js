module.exports = {
  name: 'list:license',
  alias: ['ll'],
  description: 'Lista as licenças open-source disponíveis',
  run: async (toolbox) => {
    const { print: { info, colors } } = toolbox
    info(colors.bold.cyan('\n📜 Licenças disponíveis na Syrius CLI:'))
    info('  - MIT: Licença permissiva e popular para projetos open-source.')
    info('  - APACHE: Licença com proteção de patentes.')
    info('  - GNU: Licença copyleft forte (GPL).')
    info('  - ISC: Licença simplificada similar à MIT.\n')
  },
}
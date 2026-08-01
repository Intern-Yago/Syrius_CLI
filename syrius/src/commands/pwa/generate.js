module.exports = {
  name: 'generate',
  alias: ['pwa'],
  description: 'Gera configuração PWA (Service Worker, Manifest e assets)',
  run: async (toolbox) => {
    const { parameters, createFilesPWA } = toolbox

    let name = parameters.options.name || parameters.first
    let path = parameters.options.path || './'
    if (name) {
      await createFilesPWA(name, path)
    } else {
      toolbox.print.error('O nome da PWA (--name) é obrigatório!')
    }
  },
}
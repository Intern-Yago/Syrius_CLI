module.exports = {
  name: 'ignore',
  alias: ['i'],
  description: 'Gera arquivo .gitignore pré-configurado',
  run: async (toolbox) => {
    const { createGitignore } = toolbox
    await createGitignore()
  },
}
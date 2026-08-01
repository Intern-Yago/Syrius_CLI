module.exports = {
  name: 'hook',
  alias: ['husky'],
  description: 'Configura Husky e lint-staged para verificação automatizada de código em cada git commit',
  run: async (toolbox) => {
    const { filesystem, print: { success, info, warning } } = toolbox

    const hasPkg = await filesystem.exists('package.json')
    if (!hasPkg) {
      warning('⚠️ Nenhum package.json encontrado na pasta atual. Execute `npm init` primeiro.')
      return
    }

    const pkg = await filesystem.read('package.json', 'json')
    pkg['lint-staged'] = {
      '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
      '*.{json,css,md}': ['prettier --write'],
    }

    await filesystem.write('package.json', pkg)

    const hookContent = `#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
`
    await filesystem.write('.husky/pre-commit', hookContent)

    success('🛡️ Git Hook (Husky + lint-staged) configurado com sucesso!')
    info('💡 Adicionado hook em `.husky/pre-commit` e configuração em `package.json`')
    info('🚀 Agora todos os commits serão formatados e validados automaticamente!')
  },
}

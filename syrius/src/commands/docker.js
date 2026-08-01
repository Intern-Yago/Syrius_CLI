module.exports = {
  name: 'docker',
  alias: ['d', 'dockerfile'],
  description: 'Gera Dockerfile e docker-compose.yml otimizados para seu projeto',
  run: async (toolbox) => {
    const { parameters, template, filesystem, prompt, print: { success, info, warning } } = toolbox

    let type = parameters.first || parameters.options.type

    if (!type) {
      const isNode = await filesystem.exists('package.json')
      const isReact = isNode && (await filesystem.read('package.json', 'json'))?.dependencies?.react

      const defaultType = isReact ? 'react' : isNode ? 'node' : 'web'

      const response = await prompt.ask({
        type: 'select',
        name: 'type',
        message: 'Selecione o tipo de aplicação para Docker:',
        choices: [
          { name: 'react', message: 'React / Single Page App (Nginx production)' },
          { name: 'node', message: 'Node.js / Express API' },
          { name: 'web', message: 'Static Web (HTML/CSS/JS)' },
        ],
        initial: defaultType,
      })
      type = response.type
    }

    const port = parameters.options.port || (type === 'react' ? '80' : '3000')
    const templateFile = type === 'node' ? 'docker/Dockerfile.node.ejs' : 'docker/Dockerfile.react.ejs'

    await template.generate({
      template: templateFile,
      target: 'Dockerfile',
      props: { port },
    })

    await template.generate({
      template: 'docker/docker-compose.yml.ejs',
      target: 'docker-compose.yml',
      props: { port, name: (await filesystem.read('package.json', 'json'))?.name || 'syrius-app' },
    })

    success('🐳 Dockerfile e docker-compose.yml criados com sucesso!')
    info(`📌 Porta configurada: ${port}`)
    info('💡 Execute: `docker-compose up --build` para iniciar seu container!')
  },
}

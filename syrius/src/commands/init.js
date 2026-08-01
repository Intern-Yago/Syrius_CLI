module.exports = {
  name: 'init',
  alias: ['create', 'new'],
  description: 'Assistente interativo (Wizard) para inicializar projetos e arquivos com a Syrius CLI',
  run: async (toolbox) => {
    const { prompt, print: { success, info, colors } } = toolbox

    info(colors.bold.cyan('\n🚀 Bem-vindo ao Assistente Interativo do Syrius CLI!\n'))

    const isCancel = (val) => {
      if (!val) return true
      const normalized = val.trim().toLowerCase()
      return normalized === ':q' || normalized === ':b' || normalized === ':back' || normalized === ':quit' || normalized === '!q'
    }

    let running = true

    while (running) {
      try {
        const { action } = await prompt.ask({
          type: 'select',
          name: 'action',
          message: 'O que você gostaria de criar ou configurar? (Selecione "Sair" para encerrar)',
          choices: [
            { name: 'react-component', message: '⚛️  Componente React' },
            { name: 'react-page', message: '📄  Página React' },
            { name: 'git-files', message: '📦  Arquivos Git (.gitignore, README, LICENSE)' },
            { name: 'webpage', message: '🌐  Página Web HTML5 / CSS / JS' },
            { name: 'docker', message: '🐳  Dockerfile + Docker Compose' },
            { name: 'ci', message: '⚙️  GitHub Actions CI/CD Pipeline' },
            { name: 'env', message: '🔑  Variáveis de Ambiente (.env.example)' },
            { name: 'hook', message: '🛡️  Git Hooks & Linter (Husky + lint-staged)' },
            { name: 'config', message: '⚙️  Templates Customizados (.syrius/)' },
            { name: 'info', message: '🔍  Diagnóstico do Projeto & Ambiente' },
            { name: 'pwa', message: '📱  Configuração PWA (Service Worker + Manifest)' },
            { name: 'help-man', message: '📖  Ajuda & Manual (man syrius)' },
            { name: 'exit', message: '❌  Sair do assistente' },
          ],
        })

        if (!action || action === 'exit') {
          info(colors.yellow('👋 Saindo do assistente Syrius. Até logo!\n'))
          running = false
          break
        }

        if (action === 'help-man') {
          const manCmd = require('./man')
          await manCmd.run(toolbox)
          continue
        }

        if (action === 'info') {
          const infoCmd = require('./info')
          await infoCmd.run(toolbox)
        } else if (action === 'config') {
          const configCmd = require('./config')
          await configCmd.run(toolbox)
        } else if (action === 'env') {
          const envCmd = require('./env')
          await envCmd.run(toolbox)
        } else if (action === 'hook') {
          const hookCmd = require('./hook')
          await hookCmd.run(toolbox)
        } else if (action === 'react-component') {
          const { name } = await prompt.ask({
            type: 'input',
            name: 'name',
            message: 'Nome do componente (digite ":q" para voltar):',
          })

          if (isCancel(name)) {
            info(colors.gray('↩️ Voltando ao menu principal...\n'))
            continue
          }

          const { isTs } = await prompt.ask({
            type: 'confirm',
            name: 'isTs',
            message: 'Usar TypeScript?',
            initial: true,
          })

          await toolbox.createComponent('.', name, 'component', { ts: isTs })

        } else if (action === 'react-page') {
          const { name } = await prompt.ask({
            type: 'input',
            name: 'name',
            message: 'Nome da página (digite ":q" para voltar):',
          })

          if (isCancel(name)) {
            info(colors.gray('↩️ Voltando ao menu principal...\n'))
            continue
          }

          const { isTs } = await prompt.ask({
            type: 'confirm',
            name: 'isTs',
            message: 'Usar TypeScript?',
            initial: true,
          })

          await toolbox.createComponent('.', name, 'page', { ts: isTs })

        } else if (action === 'git-files') {
          const { gitChoice } = await prompt.ask({
            type: 'select',
            name: 'gitChoice',
            message: 'Quais arquivos Git você deseja configurar?',
            choices: [
              { name: 'gitignore', message: '⚙️  Somente .gitignore (Auto-detectar Node/Python)' },
              { name: 'license', message: '📜  Somente LICENSE (MIT, APACHE, GNU, ISC)' },
              { name: 'readme', message: '📄  Somente README.md' },
              { name: 'all', message: '📦  Todos (.gitignore + LICENSE + README.md)' },
              { name: 'back', message: '↩️  Voltar ao menu principal' },
            ],
          })

          if (gitChoice === 'back') {
            continue
          }

          if (gitChoice === 'gitignore' || gitChoice === 'all') {
            await toolbox.createGitignore()
          }

          let selectedLicense = ''
          if (gitChoice === 'license' || gitChoice === 'all') {
            const { licType } = await prompt.ask({
              type: 'select',
              name: 'licType',
              message: 'Selecione a licença open-source:',
              choices: ['MIT', 'APACHE', 'GNU', 'ISC'],
            })
            selectedLicense = licType
            await toolbox.template.generate({
              template: `git/licenses/${licType}.ejs`,
              target: 'LICENSE',
            })
            success(`✨ Licença ${licType} gerada com sucesso!`)
          }

          if (gitChoice === 'readme' || gitChoice === 'all') {
            const { name } = await prompt.ask({
              type: 'input',
              name: 'name',
              message: 'Nome do projeto (digite ":q" para voltar):',
            })

            if (!isCancel(name)) {
              const { author } = await prompt.ask({
                type: 'input',
                name: 'author',
                message: 'Nome do autor:',
              })

              if (!isCancel(author)) {
                if (selectedLicense) {
                  await toolbox.template.generate({
                    template: 'git/README.md.ejs',
                    target: 'README.md',
                    props: { name, author, nameLicense: selectedLicense },
                  })
                } else {
                  await toolbox.template.generate({
                    template: 'git/READMEw.md.ejs',
                    target: 'README.md',
                    props: { name, author },
                  })
                }
                success('✨ README.md criado com sucesso!')
              }
            }
          }

        } else if (action === 'webpage') {
          const { name } = await prompt.ask({
            type: 'input',
            name: 'name',
            message: 'Nome do projeto/página (digite ":q" para voltar):',
          })

          if (isCancel(name)) {
            info(colors.gray('↩️ Voltando ao menu principal...\n'))
            continue
          }

          const { type } = await prompt.ask({
            type: 'select',
            name: 'type',
            message: 'Tipo de página:',
            choices: [
              { name: 'simple', message: 'Simples (HTML + CSS)' },
              { name: 'advanced', message: 'Completa (HTML + CSS + JS + About)' },
            ],
          })

          await toolbox.createWeb('.', name, type)

        } else if (action === 'docker') {
          const dockerCmd = require('./docker')
          await dockerCmd.run(toolbox)
        } else if (action === 'ci') {
          const ciCmd = require('./ci')
          await ciCmd.run(toolbox)
        } else if (action === 'pwa') {
          const { name } = await prompt.ask({
            type: 'input',
            name: 'name',
            message: 'Nome da sua PWA (digite ":q" para voltar):',
          })

          if (isCancel(name)) {
            info(colors.gray('↩️ Voltando ao menu principal...\n'))
            continue
          }

          await toolbox.createFilesPWA(name, '.')
        }

        // Pergunta se deseja realizar mais alguma ação
        const { nextStep } = await prompt.ask({
          type: 'select',
          name: 'nextStep',
          message: 'O que deseja fazer agora?',
          choices: [
            { name: 'continue', message: '🔄 Voltar ao menu principal' },
            { name: 'exit', message: '❌ Sair do assistente' },
          ],
        })

        if (nextStep === 'exit') {
          info(colors.yellow('👋 Saindo do assistente Syrius. Até logo!\n'))
          running = false
        } else {
          info(colors.gray('\n----------------------------------------\n'))
        }
      } catch (err) {
        info(colors.yellow('\n👋 Operação cancelada. Saindo...\n'))
        running = false
      }
    }
  },
}

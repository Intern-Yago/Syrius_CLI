module.exports = {
  name: 'man',
  alias: ['manual', 'doc'],
  description: 'Exibe o manual detalhado (man page) da Syrius CLI no terminal',
  run: async (toolbox) => {
    const { print: { info, colors }, prompt } = toolbox

    const manHeader = colors.bold.bgWhite.black(
      ' SYRIUS(1)                         Manual da Syrius CLI                         SYRIUS(1) '
    )

    const manContent = `
${manHeader}

${colors.bold.cyan('NOME')}
       ${colors.bold.white('syrius')} - Ferramenta CLI moderna para geração ágil de código e boilerplates

${colors.bold.cyan('SINOPSE')}
       ${colors.bold.yellow('syrius')} [comando] [subcomando] [opções]

${colors.bold.cyan('DESCRIÇÃO')}
       A ${colors.bold.white('Syrius CLI')} acelera o desenvolvimento eliminando tarefas repetitivas.
       Permite gerar componentes React (JS/TS), projetos Web estáticos,
       configurações de Docker, pipelines de CI/CD e arquivos Git com 1 comando.

${colors.bold.cyan('COMANDOS DO ASSISTENTE')}
       ${colors.bold.green('syrius init')} (aliases: ${colors.bold.white('create, new')})
              Inicia o assistente interativo (Wizard) com menu contínuo.

${colors.bold.cyan('GERAÇÃO DE REACT & TYPESCRIPT')}
       ${colors.bold.green('syrius generate:component')} <Nome> [--ts] [caminho]  (aliases: ${colors.bold.white('gc, component, c')})
              Cria um componente React em index.jsx (ou index.tsx) + styles.module.css.

       ${colors.bold.green('syrius generate:page')} <Nome> [--ts] [caminho]       (aliases: ${colors.bold.white('gp, page, p')})
              Cria uma página React em index.jsx (ou index.tsx) + styles.module.css.

${colors.bold.cyan('CONTAINERIZAÇÃO & DEVOPS')}
       ${colors.bold.green('syrius docker')} [--type react|node|web] [--port N]    (aliases: ${colors.bold.white('d, dockerfile')})
              Gera Dockerfile e docker-compose.yml otimizados para produção.

       ${colors.bold.green('syrius ci')}                                         (aliases: ${colors.bold.white('workflow, actions')})
              Cria o pipeline do GitHub Actions (.github/workflows/ci.yml).

${colors.bold.cyan('WEBSITES & GIT')}
       ${colors.bold.green('syrius pageweb simple')} --name <Nome>                (alias: ${colors.bold.white('s')})
              Cria estrutura básica (index.html + styles.css).

       ${colors.bold.green('syrius pageweb advanced')} --name <Nome>              (alias: ${colors.bold.white('adv')})
              Cria estrutura completa (HTML, CSS, JS, About).

       ${colors.bold.green('syrius git ignore')}                                 (alias: ${colors.bold.white('i')})
              Gera .gitignore (detecta Node.js ou Python).

       ${colors.bold.green('syrius git readme')} --name <Nome> --author <Autor>  (alias: ${colors.bold.white('r')})
              Gera README.md profissional formatado.

       ${colors.bold.green('syrius git license')} <MIT|APACHE|GNU|ISC>           (alias: ${colors.bold.white('l')})
              Gera o arquivo LICENSE com os termos da licença escolhida.

${colors.bold.cyan('PWA SUPPORT')}
       ${colors.bold.green('syrius pwa generate')} --name <Nome>                 (alias: ${colors.bold.white('pwa')})
              Gera Service Worker (sw.js), initSW.js, manifest.json e favicons.

${colors.bold.cyan('EXEMPLOS')}
       $ ${colors.bold.white('syrius init')}
       $ ${colors.bold.white('syrius gc Header --ts')}
       $ ${colors.bold.white('syrius gp Dashboard --ts .')}
       $ ${colors.bold.white('syrius docker --type react')}
       $ ${colors.bold.white('syrius git readme --name "MeuProjeto" --author "Yago"')}

${colors.bold.cyan('DOCUMENTAÇÃO WEB')}
       Para ver a documentação visual interativa, abra o arquivo index.html no navegador.
`

    info(manContent)

    await prompt.ask({
      type: 'input',
      name: 'continue',
      message: 'Pressione Enter para retornar ao menu...',
    })
  },
}

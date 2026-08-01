module.exports = (toolbox) => {
  const { filesystem, template, print: { success, error, info }, prompt } = toolbox

  async function isReactNative() {
    const pkg = await filesystem.read('package.json', 'json')
    return pkg && pkg.dependencies && !!pkg.dependencies['react-native']
  }

  async function hasStyledComponent() {
    const pkg = await filesystem.read('package.json', 'json')
    return pkg && pkg.dependencies && !!pkg.dependencies['styled-components']
  }

  async function createComponent(path, name, type, options = {}) {
    let targetName = name
    let targetPath = path
    let isTs = options.ts || options.typescript

    if (!targetName) {
      const response = await prompt.ask({
        type: 'input',
        name: 'name',
        message: `Qual o nome do ${type}?`,
        validate: (v) => (v ? true : 'O nome é obrigatório!'),
      })
      targetName = response.name
    }

    if (!targetName) {
      error('O nome precisa ser especificado!')
      return
    }

    if (isTs === undefined) {
      const isTsProject = await filesystem.exists('tsconfig.json')
      if (isTsProject) {
        isTs = true
      }
    }

    const ext = isTs ? 'tsx' : 'jsx'
    let target = ''
    let targetStyle = ''

    const formattedName = targetName[0].toUpperCase() + targetName.substring(1)

    if (!targetPath || targetPath === '.') {
      target = `src/${type}s/${formattedName}/index.${ext}`
      targetStyle = (await isReactNative())
        ? `src/${type}s/${formattedName}/styles.js`
        : `src/${type}s/${formattedName}/styles.module.css`
    } else {
      if (targetPath.endsWith('.jsx') || targetPath.endsWith('.tsx') || targetPath.endsWith('.js') || targetPath.endsWith('.ts')) {
        target = targetPath
        targetStyle = (await isReactNative())
          ? targetPath.slice(0, targetPath.lastIndexOf('/')).concat('/styles.js')
          : targetPath.slice(0, targetPath.lastIndexOf('/')).concat('/styles.module.css')
      } else {
        target = `${targetPath}/${formattedName}/index.${ext}`
        targetStyle = (await isReactNative())
          ? `${targetPath}/${formattedName}/styles.js`
          : `${targetPath}/${formattedName}/styles.module.css`
      }
    }

    // Check for custom user template in .syrius/
    const customTemplatePath = `.syrius/component.${ext}.ejs`
    const hasCustomTemplate = await filesystem.exists(customTemplatePath)

    if (hasCustomTemplate) {
      info(`⚡ Usando template personalizado do usuário (.syrius/component.${ext}.ejs)`)
      const customContent = await filesystem.read(customTemplatePath)
      const rendered = template.render(customContent, { props: { name: formattedName } })
      await filesystem.write(target, rendered)
    } else {
      const componentTemplate = (await isReactNative())
        ? (await hasStyledComponent())
          ? 'react-native/component/styledComponent/component.jsx.ejs'
          : 'react-native/component/component.jsx.ejs'
        : isTs
        ? 'react/component/component.tsx.ejs'
        : 'react/component/component.jsx.ejs'

      await template.generate({
        template: componentTemplate,
        target: target,
        props: { name: formattedName },
      })
    }

    const styleTemplate = (await isReactNative())
      ? (await hasStyledComponent())
        ? 'react-native/component/styledComponent/styles.js.ejs'
        : null
      : 'react/component/styles.module.css.ejs'

    if (styleTemplate) {
      await template.generate({
        template: styleTemplate,
        target: targetStyle,
      })
    }

    success(`✨ ${type.toUpperCase()} React (${isTs ? 'TypeScript' : 'JavaScript'}) criado com sucesso!`)
    info(`📁 Arquivo principal: ${target}`)
    info(`🎨 Arquivo de estilo: ${targetStyle}`)
  }

  toolbox.createComponent = createComponent
}
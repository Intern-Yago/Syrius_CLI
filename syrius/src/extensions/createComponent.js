const { generateFilesEngine } = require('./generateFiles')

module.exports = (toolbox) => {
  const { filesystem, print: { error }, prompt } = toolbox

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

    const filesToGenerate = []

    // Check for custom user template in .syrius/
    const customTemplatePath = `.syrius/component.${ext}.ejs`
    const hasCustomTemplate = await filesystem.exists(customTemplatePath)

    if (hasCustomTemplate) {
      const customContent = await filesystem.read(customTemplatePath)
      filesToGenerate.push({
        target,
        customContent,
        props: { name: formattedName },
      })
    } else {
      const componentTemplate = (await isReactNative())
        ? (await hasStyledComponent())
          ? 'react-native/component/styledComponent/component.jsx.ejs'
          : 'react-native/component/component.jsx.ejs'
        : isTs
        ? 'react/component/component.tsx.ejs'
        : 'react/component/component.jsx.ejs'

      filesToGenerate.push({
        template: componentTemplate,
        target,
        props: { name: formattedName },
      })
    }

    const styleTemplate = (await isReactNative())
      ? (await hasStyledComponent())
        ? 'react-native/component/styledComponent/styles.js.ejs'
        : null
      : 'react/component/styles.module.css.ejs'

    if (styleTemplate) {
      filesToGenerate.push({
        template: styleTemplate,
        target: targetStyle,
        props: { name: formattedName },
      })
    }

    if (toolbox.generateFiles) {
      await toolbox.generateFiles(filesToGenerate, { force: options.force })
    } else {
      await generateFilesEngine(toolbox, filesToGenerate, { force: options.force })
    }
  }

  toolbox.createComponent = createComponent
}
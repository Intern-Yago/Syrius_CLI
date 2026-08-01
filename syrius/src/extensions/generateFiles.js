async function generateFilesEngine(toolbox, filesToGenerate, options = {}) {
  // Support signature generateFiles(filesToGenerate, options) if attached to toolbox
  if (Array.isArray(toolbox) && !filesToGenerate) {
    filesToGenerate = toolbox
    toolbox = this
  }

  const { filesystem, template, print: { colors, info, success, warning }, prompt } = toolbox
  const results = []
  const force = options.force || false

  info('') // Empty line for spacing

  for (const fileDef of filesToGenerate) {
    const { template: tmplName, target, props = {}, customContent } = fileDef
    const fileExists = await filesystem.exists(target)

    let shouldWrite = true

    if (fileExists && !force) {
      const { overwrite } = await prompt.ask({
        type: 'confirm',
        name: 'overwrite',
        message: `⚠️ O arquivo "${target}" já existe. Deseja sobrescrevê-lo?`,
        initial: false,
      })
      shouldWrite = overwrite
    }

    if (!shouldWrite) {
      results.push({ action: 'SKIP', path: target, size: 0 })
      continue
    }

    if (customContent) {
      const rendered = template.render(customContent, { props })
      await filesystem.write(target, rendered)
    } else {
      await template.generate({
        template: tmplName,
        target: target,
        props: props,
      })
    }

    const fileStats = await filesystem.inspect(target)
    const sizeBytes = fileStats ? fileStats.size : 0

    results.push({ action: 'CREATE', path: target, size: sizeBytes })
  }

  info('')
  results.forEach((res) => {
    if (res.action === 'CREATE') {
      info(` ${colors.bold.green('CREATE')}  ${res.path} (${res.size} bytes)`)
    } else {
      info(` ${colors.bold.yellow('SKIP  ')}  ${res.path} (mantido)`)
    }
  })

  const createdCount = results.filter((r) => r.action === 'CREATE').length
  if (createdCount > 0) {
    success(`\n✨ Gerado ${createdCount} arquivo(s) com sucesso!`)
  } else {
    warning('\n⚠️ NENHUM arquivo foi alterado.')
  }

  return results
}

module.exports = (toolbox) => {
  toolbox.generateFiles = (files, options) => generateFilesEngine(toolbox, files, options)
}

module.exports.generateFilesEngine = generateFilesEngine

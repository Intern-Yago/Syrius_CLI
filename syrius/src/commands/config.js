module.exports = {
  name: 'config',
  alias: ['templates'],
  description: 'Inicializa a pasta .syrius/ com modelos de componentes customizados para a equipe',
  run: async (toolbox) => {
    const { filesystem, print: { success, info } } = toolbox

    const sampleTsx = `import React from 'react';
import styles from './styles.module.css';

// Template Customizado pela Equipe (.syrius/component.tsx.ejs)
export interface <%= props.name %>Props {
  className?: string;
}

export const <%= props.name %>: React.FC<<%= props.name %>Props> = ({ className = '' }) => {
  return (
    <div className={\`\${styles.container} \${className}\`}>
      <h2><%= props.name %> Component</h2>
    </div>
  );
};

export default <%= props.name %>;
`

    const sampleJsx = `import React from 'react'
import styles from './styles.module.css'

// Template Customizado pela Equipe (.syrius/component.jsx.ejs)
export default function <%= props.name %>() {
  return (
    <div className={styles.container}>
      <h2><%= props.name %> Component</h2>
    </div>
  )
}
`

    await filesystem.write('.syrius/component.tsx.ejs', sampleTsx)
    await filesystem.write('.syrius/component.jsx.ejs', sampleJsx)

    success('⚙️ Pasta de configurações .syrius/ criada com sucesso!')
    info('📁 Você pode editar os arquivos `.syrius/component.tsx.ejs` e `.syrius/component.jsx.ejs`')
    info('💡 Toda vez que você rodar `syrius gc <Nome>`, a CLI usará seus modelos customizados!')
  },
}

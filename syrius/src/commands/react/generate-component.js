module.exports={
    name: 'generate:component',
    alias:['gc'],
    description: 'Create new component react',
    run: async toolbox=>{
        const {
            parameters,
            createComponent
        } = toolbox

        const name = parameters.options.name
        const path = parameters.options.path

        await createComponent(path, name, 'component')
        
    },
}
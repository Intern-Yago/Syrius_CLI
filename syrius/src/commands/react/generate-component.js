module.exports={
    name: 'generate:component',
    description: 'Create new component react',
    run: async toolbox=>{
        const {
            parameters,
            createComponent
        } = toolbox

        const name = parameters.first
        const path = parameters.second

        await createComponent(path, name, 'component')
        
    },
}
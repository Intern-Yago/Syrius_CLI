module.exports={
    name: 'generate:component',
    alias:['gc'],
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
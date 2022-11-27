module.exports={
    name: 'generate:component',
    description: 'Create new component react inside src/component',
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
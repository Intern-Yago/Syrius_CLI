module.exports={
    name: 'generate:page',
    alias:['gp'],
    description: 'Create new page react',
    run: async toolbox=>{
        const {
            parameters,
            createComponent
        } = toolbox

        const name = parameters.options.name
        const path = parameters.options.path

        await createComponent(path, name, 'page')
        
    },
}
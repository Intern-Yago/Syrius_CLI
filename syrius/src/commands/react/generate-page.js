module.exports={
    name: 'generate:page',
    description: 'Create new page react',
    run: async toolbox=>{
        const {
            parameters,
            createComponent
        } = toolbox

        const name = parameters.first
        const path = parameters.second

        await createComponent(path, name, 'page')
        
    },
}
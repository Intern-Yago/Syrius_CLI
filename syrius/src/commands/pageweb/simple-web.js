module.exports={
    name: 'simple',
    alias:['s'],
    description: 'Create new page react',
    run: async toolbox=>{
        const {
            parameters,
            createWeb
        } = toolbox

        const name = parameters.options.name
        const path = parameters.options.path

        await createWeb(path, name, 'simple')
        
    },
}
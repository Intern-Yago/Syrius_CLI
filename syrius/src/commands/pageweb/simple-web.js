module.exports={
    name: 'simple',
    alias:['s'],
    description: 'Create new page react',
    run: async toolbox=>{
        const {
            parameters,
            createWeb
        } = toolbox

        const name = parameters.first
        const path = parameters.second

        await createWeb(path, name, 'simple')
        
    },
}
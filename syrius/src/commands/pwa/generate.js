module.exports = {
    name:'generate',
    description: 'Create basic config of PWA',
    run: async toolbox =>{
        const {
            parameters,
            createFilesPWA
        } = toolbox

        let name = parameters.options.name
        let path = parameters.options.path || './'
        if (name){
            await createFilesPWA(name, path)
        }
    }
}
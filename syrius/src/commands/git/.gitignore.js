module.exports={
    name: 'ignore',
    description: 'Create initial configure git: .gitignore',
    run: async toolbox=>{
        const {
            template,
            print:{success}
        } = toolbox

        await template.generate({
            template:"git/.gitignore.ejs",
            target: '.gitignore',
        })
        success(`Generated git`)
    },

}
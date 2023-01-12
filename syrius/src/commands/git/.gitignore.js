module.exports={
    name: 'ignore',
    description: 'Create initial configure git: .gitignore',
    run: async toolbox=>{
        const {
            createGitignore
        } = toolbox

        await createGitignore()
    },

}
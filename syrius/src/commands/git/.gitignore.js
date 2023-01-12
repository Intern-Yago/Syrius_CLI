module.exports={
    name: 'ignore',
    alias:['i'],
    description: 'Create initial configure git: .gitignore',
    run: async toolbox=>{
        const {
            createGitignore
        } = toolbox

        await createGitignore()
    },

}
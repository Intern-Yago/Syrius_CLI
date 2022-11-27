module.exports={
    name: 'license',
    description: 'Create initial configure git: LICENSE',
    run: async toolbox=>{
        const {
            template,
            print:{success}
        } = toolbox

        await template.generate({
            template:"git/LICENSE.ejs",
            target: 'LICENSE',
        })
        success(`Generated LICENSE MIT`)
    },

}
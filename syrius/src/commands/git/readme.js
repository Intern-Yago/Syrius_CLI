module.exports={
    name: 'readme',
    description: 'Create initial configure git: README.md',    
    run: async toolbox=>{
        const {
            parameters,
            template,
            print:{success, error}
        } = toolbox

        const name = parameters.first
        const author = parameters.second

        if(!name || !author){
            error("Name/author must be specified")
            return
        }

        await template.generate({
            template:"git/README.md.ejs",
            target: 'README.md',
            props:{name,author}
        })
        success(`Generated README`)
    },

}
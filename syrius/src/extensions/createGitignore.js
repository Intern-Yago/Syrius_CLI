const fs = require('fs')
module.exports = (toolbox)=>{
    const {filesystem, template, print:{success, muted}} = toolbox

    async function createGitignore(){

        const node = !!fs.existsSync("package.json")
        const python = !!fs.existsSync("pyvenv.cfg")

        var language = node? "node" : python ? "python" : false
        var modelo
        
        switch (language){
            case "node":
                modelo = "git/gitignore/node.ejs"
                muted("Gitignore node generated");
                break
            case "python":
                modelo = "git/gitignore/python.ejs"
                muted("Gitignore python generated");
                break
            default:
                modelo = "git/gitignore/node.ejs"
                muted("Gitignore node generated");
            
        }

        await template.generate({
            template:modelo,
            target: '.gitignore',
        })
        success(`Generated git`)
    }
    toolbox.createGitignore = createGitignore
}
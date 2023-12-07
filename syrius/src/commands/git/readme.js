const fs = require('fs')
var prompt = require('prompt-sync')()

module.exports={
    name: 'readme',
    alias:['r'],
    description: 'Create initial configure git: README.md',   
     
    run: async toolbox=>{
        const {
            parameters,
            template,
            filesystem,
            print:{success, error, warning}
        } = toolbox


        function hasLicense(){
            return !!fs.existsSync("LICENSE")
        }

        const author = parameters.options.author
        const name = parameters.options.name
        var nameLicense = parameters.nameLicense

        if(!nameLicense){
            if(hasLicense()){
                nameLicense = prompt("Qual o nome da licensa usada? ").trim()

                if(!nameLicense){
                    warning("License not informed... Continue whithout this")
                }
            }
            else{
                warning("License not informed... Continue whithout this")
            }
        }

        if(!name || !author){
            error("Name/author must be specified")
            return
        }
        if (!nameLicense){
            await template.generate({
                template:"git/READMEw.md.ejs",
                target: 'README.md',
                props:{name,author}
            })
            success(`Generated README`)
        }
        else{
            nameLicense = nameLicense.toUpperCase()
            await template.generate({
                template:"git/README.md.ejs",
                target: 'README.md',
                props:{name,author, nameLicense}
            })
            success(`Generated README`)
        }
    },

}
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
            print:{success, error, info}
        } = toolbox


        function hasLicense(){
            return !!fs.existsSync("LICENSE")
        }

        const author = parameters.first
        const name = parameters.second
        var nameLicense = parameters.third

        if(!nameLicense){
            if(hasLicense()){
                nameLicense = prompt("Qual o nome da licensa usada? ").trim()

                if(!nameLicense){
                    info("License not informed... Continue whithout this")
                }
            }
            else{
                info("License not informed... Continue whithout this")
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
module.exports={
    name: 'license',
    description: 'Create initial configure git: LICENSE',
    run: async toolbox=>{
        const {
            template,
            parameters,
            print:{success, error}
        } = toolbox

        const nameLicense = parameters.first.toUpperCase()
        const licenses = ["MIT", "ISC", "GNU", "APACHE"]
        if (!nameLicense ||  licenses.indexOf(nameLicense) <= -1){
            error("License must be specified!")
            console.log(`Possible licenses: ${licenses}`);
            console.log("Use the list:license command to get a summary of the licenses");
            return
        }
        await template.generate({
            template:`git/licenses/${nameLicense}.ejs`,
            target: 'LICENSE',
        })
        success(`Generated license ${nameLicense}`)
    },

}
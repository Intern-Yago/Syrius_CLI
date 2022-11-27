module.exports={
    name: 'advanced',
    description: 'Create new page react',
    run: async toolbox=>{
        const {
            parameters,
            createWeb,
            template
        } = toolbox

        const name = parameters.first
        const path = parameters.second
        let targetScripts = ""
        let targetAbout = ""

        const response = await createWeb(path, name, 'advanced')
        if(response === "error") return

        if (!path){
            targetScripts = `src/${name}/scripts.js`
            targetAbout = `src/${name}/about.html`
            
        }else{
            if(path.includes(".html")){
                targetScripts = path.replace("index.", "about.")
                targetScripts = path.slice(0,-4).replace("index.", "scripts.js")
            }
            else{
                targetAbout = `${path}/about.html`
                targetScripts = `${path}/scripts.js`
            }
        }

        await template.generate({
            template:'advancedPage/scripts.js.ejs',
            target: targetScripts,
        })
        await template.generate({
            template:'advancedPage/about.html.ejs',
            target: targetAbout,
            props: {name}
        })


    },
}
//CRIAR JS
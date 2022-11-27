module.exports = (toolbox)=>{
    const {template, print:{success, error}} = toolbox

    
    async function createWeb(path, name, type){
        async function isAdvanced(){
            if(type==="advanced"){
                return true
            }else{
                return false
            }
        }
        if(!name){
            error('Name must be specified!')
            return "error"
        }

        if (!path){
            target = `src/${name}/index.html`
            targetStyle = `src/${name}/styles.css`
            
        }else{
            if(path.includes(".html")){
                target = path
                targetStyle = path.slice(0,-4).replace("index.", "styles.css")
            }
            else{
                target = `${path}/index.html`
                targetStyle = `${path}/styles.css`
                
            }
        }

        const indexTemplate = (await isAdvanced())
        ? 'advancedPage/index.html.ejs'
        : 'simplePage/index.html.ejs'
        await template.generate({
            template:indexTemplate,
            target: target,
            props:{name}
        })

        const stylesTemplate = (await isAdvanced())
        ? 'advancedPage/styles.css.ejs'
        : 'simplePage/styles.css.ejs'
        await template.generate({
            template:stylesTemplate,
            target: targetStyle,
        })

    success(`Generated ${name} ${type}`)
    }
    toolbox.createWeb = createWeb
}
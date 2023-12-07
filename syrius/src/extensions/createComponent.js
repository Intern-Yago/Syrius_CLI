module.exports = (toolbox)=>{
    const {filesystem, template, print:{success, error, warning}} = toolbox

    async function isReactNative(){
        const package = await filesystem.read('package.json', 'json')
        return !!package.dependencies['react-native']
    }

    async function hasStyledComponent(){
        const package = await filesystem.read('package.json', 'json')
        return !!package.dependencies['styled-components']
    }

    async function createComponent(path, name, type){
        let target = ""
        let targetStyle = ""

        if(!name){
            error('Name must be specified!')
            return 
        }

        if (!path){
            target = `src/pages/${name}/index.jsx`
            targetStyle = (await isReactNative())
            ? `src/pages/${name}/styles.js`
            :`src/pages/${name}/styles.module.css`

        }else{
            if(path.includes(".jsx") ||  path.includes(".js")){
                target = path
                targetStyle = (await isReactNative())
                ? path.slice(0,-3).replace("index.", "styles.js")
                :path.slice(0,-3).replace("index.", "styles.module.css")
            }
            else{
                target = `${path}/index.jsx`
                targetStyle = (await isReactNative())
                ?`${path}/styles.js`
                :`${path}/styles.module.css`
                
            }
        }


        const componentTemplate = (await isReactNative())
        ? (await hasStyledComponent())
            ? 'react-native/component/styledComponent/component.jsx.ejs'
            : 'react-native/component/component.jsx.ejs'
        : 'react/component/component.jsx.ejs'
        await template.generate({
            template:componentTemplate,
            target: target,
            props:{name}
        })
        
        const styleTemplate = (await isReactNative())
        ? (await hasStyledComponent())
            ?'react-native/component/styledComponent/styles.js.ejs'
            :null
        : 'react/component/styles.module.css.ejs'
        
        if(styleTemplate){
            await template.generate({
                template:styleTemplate,
                target: targetStyle
            })
        }


        success(`Generated ${name} ${type}`)
    }
    toolbox.createComponent = createComponent
}
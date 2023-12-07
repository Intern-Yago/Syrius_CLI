module.exports = (toolbox)=>{
    const {template, patching, print:{success, error, muted, highlight}} = toolbox
    async function createFilesPWA(name,path){
        let sucessos = []
        async function generateSWInit(path){
            await template.generate({
                template:'pwa/initSW.js.ejs',
                target:`${path}/initSW.js`,
            })
            muted("SW init gerado com sucesso")
            sucessos.push('Init')
        }
        await generateSWInit( path)
        
        async function generateSW(name, path){
            await template.generate({
                template:'pwa/sw.js.ejs',
                target:`${path}/sw.js`,
                props:{name}
            })
            muted("SW gerado com sucesso")
            sucessos.push('SW')
        }
        await generateSW(name,path)

        async function generateManifest(name,path){
            await template.generate({
                template: 'pwa/manifest.json.ejs',
                target: `${path}/manifest.json`,
                props:{name}
            })
            muted("SW gerado com sucesso")
            sucessos.push('manifest')
        }
        await generateManifest(name, path)

        async function editIndex(){
            patching.patch('index.html', {insert: '<link rel="manifest" href="manifest.json">', after: '<head>'})
            muted("Index html mudado com sucesso")
            sucessos.push('index')
        }
        await editIndex()

        if(sucessos.length >=3){
            success("PWA gerado com sucesso")
            highlight("Faça alterações necessárias no manifest")
        }else{
            if(!('manifest' in sucesso)){
                error('Falha na criação do manifest')
            }
            else if(!('SW' in sucesso)){
                error('Falha na criação do sw.js')
            }
            else if(!('Init' in sucesso)){
                error('Falha na criação do SW init')
            }
            else if(!('index' in sucesso)){
                error('Falha na edição do index.html')
            }
            else{
                error("Erro desconhecido")
            }
        }
    }
    
    toolbox.createFilesPWA = createFilesPWA
}
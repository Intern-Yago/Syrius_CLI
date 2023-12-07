module.exports = (toolbox)=>{
    const {template, patching,filesystem, print:{success, error, muted, highlight}} = toolbox
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
            patching.patch('index.html', {insert: '<link rel="manifest" href="manifest.json"> <script defer src="./initSW.js"></script>', after: '<head>'})
            muted("Index html mudado com sucesso")
            sucessos.push('index')
        }
        await editIndex()

        async function generateImages(path){
            await template.generate({
                template: 'pwa/screenshot1.svg.ejs',
                target: `assets/screenshot1.svg`,
            })
            await template.generate({
                template: 'pwa/screenshot2.svg.ejs',
                target: `assets/screenshot2.svg`,
            })
            await template.generate({
                template: 'pwa/favicon.svg.ejs',
                target: `assets/favicon.svg`,
            })
            
            muted("Imagens geradas")
            sucessos.push("imagens")
        }
        await generateImages(path)

        if(sucessos.length >=3){
            success("PWA gerado com sucesso")
            highlight("Faça alterações necessárias no manifest")
        }else{
            if(!('manifest' in sucessos)){
                error('Falha na criação do manifest')
            }
            else if(!('SW' in sucessos)){
                error('Falha na criação do sw.js')
            }
            else if(!('Init' in sucessos)){
                error('Falha na criação do SW init')
            }
            else if(!('index' in sucessos)){
                error('Falha na edição do index.html')
            }
            else if(!('imagens' in sucessos)){
                error('Falha ao gerar as imagens')
            }
            else{
                error("Erro desconhecido")
            }
        }
    }
    
    toolbox.createFilesPWA = createFilesPWA
}
import { ParserDOM, $$ } from './functions.js'

export default class Model {
    constructor() {
        this.view = null
    }
    
    setView(view) {
        this.view = view
    }

    async onSubmit(data) {
        const { url } = data
        
        try {
            // Obtenemos la pagina web
            const res = await fetch(url)
            const data = await res.text()
            const DOMData = ParserDOM(data, 'text/html')

            // Ponemos todas las urls en absoluto para que funcionen en la app
            const elementsLinks = $$('*[src], *[href]', DOMData)
            elementsLinks.forEach(elementLink => {
                if (elementLink.hasAttribute('href')) {
                    const href = elementLink.getAttribute('href')
                    const linkUrl = new URL(href, url).href
                    elementLink.setAttribute('href', linkUrl)
                } else if (elementLink.hasAttribute('src')) {
                    const src = elementLink.getAttribute('src')
                    const linkUrl = new URL(src, url).href
                    elementLink.setAttribute('src', linkUrl)
                }
            })

            // Guardamos todas las urls en un array para mostrar los archivos en el editor
            const urlsHtml = []

            elementsLinks.forEach(element => {
                if (element.hasAttribute('href')) {
                    urlsHtml.push({
                        attribute: 'href',
                        url: element.getAttribute('href')
                    })
                } else if (element.hasAttribute('src')) {
                    urlsHtml.push({
                        attribute: 'src',
                        url: element.getAttribute('src')
                    })
                }
            })

            return {
                urlsHtml,
                DOMData
            }
        } catch (err) {
            console.error(err)
        }
    }
}
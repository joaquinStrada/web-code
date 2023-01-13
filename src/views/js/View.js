import FormUrl from './components/FormUrl.js'
import { $id, convertHtmlToString } from './functions.js'

export default class View {
    constructor() {
        this.model = null

        this.formUrl = new FormUrl()
        this.iframeWeb = $id('iframe-web')

        this.formUrl.onSubmit(data => this.onSubmit(data))
    }

    setModel(model) {
        this.model = model
    }

    async onSubmit(data) {
        const { urlsHtml, DOMData } = await this.model.onSubmit(data)
        const htmlString = convertHtmlToString(DOMData)
        this.iframeWeb.setAttribute('srcdoc', htmlString)
        console.log(urlsHtml);
    }
}
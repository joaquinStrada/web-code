import { $id } from '../functions.js'
import InputError from './InputError.js'

export default class FormUrl {
    constructor() {
        this.app = $id('app')
        this.inputUrl = $id('input-url')
        this.btnScanUrl = $id('btn-scan-url')
        this.inputError = new InputError()

        this.inputsError = {
            url: true
        }

        this.regExp = {
            url: /(https:\/\/)?[\w\-\.]+\.\w{2,5}\/?\s*/
        }

        this.render()
    }

    onInputUrl() {
        if (this.regExp.url.test(this.inputUrl.value)) {
            this.inputError.hideAlert()
            this.inputsError.url = false
        } else {
            this.inputError.showAlert('El campo debe ser una URL')
            this.inputsError.url = true 
        }
    }

    onSubmit(callback) {
        this.btnScanUrl.addEventListener('click', () => {
            if (this.inputsError.url) {
               this.inputError.showAlert('El campo debe ser una URL')
               return
            }
            this.inputError.hideAlert()

            const data = {
                url: this.inputUrl.value
            }

            callback(data)
        })
    }

    render() {
        this.app.addEventListener('submit', e => e.preventDefault())
        this.app.reset()

        this.inputUrl.addEventListener('keyup', () => this.onInputUrl())
        this.inputUrl.addEventListener('blur', () => this.onInputUrl())
    }
}
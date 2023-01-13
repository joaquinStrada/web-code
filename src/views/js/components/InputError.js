import { $id } from '../functions.js'

export default class InputError {
    constructor() {
        this.txtInputError = $id('txt-input-error')
    }

    showAlert(message) {
        this.txtInputError.innerText = message

        if (!this.txtInputError.classList.contains('is-active')) {
            this.txtInputError.classList.add('is-active')
        }
    }

    hideAlert() {
        if (this.txtInputError.classList.contains('is-active')) {
            this.txtInputError.classList.remove('is-active')
        }
    }
}
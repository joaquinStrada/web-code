export const $ = (selector, parent = document) => parent.querySelector(selector)

export const $$ = (selector, parent = document) => parent.querySelectorAll(selector)

export const $id = id => document.getElementById(id)

export const ParserDOM = (text, format) => {
    const parserDOM = new DOMParser()
    return parserDOM.parseFromString(text, format)
}

export const convertHtmlToString = html => `<html>${html.querySelector('*').innerHTML}</html>`

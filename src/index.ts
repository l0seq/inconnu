import { escapeHtml } from "./utils";
export class APIData {
    identifier: HTMLElement | string;
    readonly element: HTMLElement;
    constructor(identifier: HTMLElement | string, doc: Document) {
        this.identifier = identifier;
        if (identifier instanceof HTMLElement) {
            this.element = identifier;
        }
        else {
            this.element = doc.querySelector('[data-foreach="' + identifier + '"]') as HTMLElement;
        }
    }

    fill<T extends any[]>(data: T) {
        const tpl = (this.element.querySelector("template") as HTMLTemplateElement).content
        data.forEach((item) => {
            const tplClone = tpl.cloneNode(true) as HTMLElement
            const slotElements = tplClone.querySelectorAll('[data-text]')
            const attrElements = tplClone.querySelectorAll('[data-bind]')
            slotElements.forEach((e) => {
                e.textContent = escapeHtml(item[e.getAttribute("data-text")!])
            })
            attrElements.forEach((e) => {
                const bindAttr = [...e.attributes].filter((i) => {
                    return i.name.startsWith(":")
                })
                bindAttr.forEach((a) => {
                    e.setAttribute(a.name.substring(1), escapeHtml(item[a.value]))
                    e.removeAttribute(a.name)
                })
            })
            this.element.appendChild(tplClone)
        })
    }
}
export type StyleSheet = Partial<CSSStyleDeclaration>

export function setStyle(ele: HTMLElement, styleSheet: StyleSheet) {
    const style = ele.style

    for (const [key, value] of Object.entries(styleSheet)) {
        if (value) {
            style.setProperty(key, String(value))
        }
    }

    return ele
}

const isObject = (target: any) => Object.prototype.toString.call(target) === '[object Object]'


export type Props = {
    [key: string]: any
}

interface Vnode {
    tag: string,
    props: Props,
    children?: string | Vnode[]
}

export function createElement(vnode: Vnode, container: HTMLElement) {
    const wrapper = document.createElement(vnode.tag)

    for (let [key, value] of Object.entries(vnode.props)) {
        if (value) {
            if (isObject(value)) {
                value = Object.entries(value).map(v => v.join(':')).join(';')
            }
            wrapper.setAttribute(key, value)
        }
    }

    if (vnode.children) {
        if (typeof vnode.children === 'string') {
            wrapper.textContent = vnode.children
        } else if (Array.isArray(vnode.children)) {
            vnode.children.forEach(child => {
                createElement(child, wrapper)
            })
        }
    }

    container.appendChild(wrapper)
    return wrapper
}

const body = document.body
const head = document.head
const styleStr = `.box {
    position: fixed;
    background-color: #badc58;
    opacity: .4;
    width: 100px;
    height: 100px;
    transition: all 0.05s linear;
    pointer-events: none;
    z-index: 9999;
}

.point {
    position: fixed;
    pointer-events: none;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.1);
    background-color: #badc58;
    z-index: 9999;
}

.plane {
    position: fixed;
    right: 20px;
    top: 20px;
    pointer-events: none;
    display: inline-block;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, .2);
    backdrop-filter: blur(3px);
    z-index: 9999;
}`

createElement({ tag: 'style', props: {}, children: styleStr }, head)

export const box = createElement({ tag: 'div', props: { class: 'box' } }, body)
export const point = createElement({ tag: 'div', props: { class: 'point' } }, body)
export const plane = createElement({
    tag: 'div',
    props: {
        class: 'plane'
    },
    children: [
        {
            tag: 'pre',
            props: { class: 'pre' }
        }
    ],
}, body)
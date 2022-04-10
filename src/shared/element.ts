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
const styleStr = `.stiljs-box {
    position: fixed;
    background-color: #badc58;
    opacity: .4;
    width: 100px;
    height: 100px;
    transition: all 0.05s linear;
    pointer-events: none;
    z-index: 999999;
    display: none;
}

.stiljs-panel {
    position: fixed;
    right: 20px;
    top: 20px;
    pointer-events: none;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, .2);
    backdrop-filter: blur(3px);
    z-index: 999999;
    display: none;
    max-width: 80vw;
    max-height: 80vh;
    overflow: auto
}

.stiljs-panel::-webkit-scrollbar {
    width:4px;
    height: 4px;
    background-color:#F5F5F5;
}

.stiljs-panel::-webkit-scrollbar-track {
    -webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.1);
    border-radius:10px;
    background-color:#f1f5f8;
}

.stiljs-panel::-webkit-scrollbar-thumb {
    border-radius:10px;
    -webkit-box-shadow:inset 0 0 6px rgba(0,0,0,.1);
    background-color:#ccc;
}

.stiljs-pre {
    font-weight: 700;
    font-size: 12px;
    pointer-events: none;
}

.stiljs-tips {
    position: fixed;
    top: -100%;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px 20px;
    background-color: #f1f5f8;
    color: #333;
    border-radius: 6px;
    z-index: 999999;
    transition: all 0.5s ease-in-out;
    pointer-events: none;
}

.stiljs-tag-name {
    font-weight: 700;
    text-align: center;
    font-size: 16px;
    pointer-events: none;
}`

createElement({ tag: 'style', props: {}, children: styleStr }, head)

export const box = createElement({ tag: 'div', props: { class: 'stiljs-box' } }, body)
export const plane = createElement({
    tag: 'div',
    props: {
        class: 'stiljs-panel'
    },
    children: [
        {
            tag: 'div',
            props: { class: 'stiljs-tag-name' }
        },
        {
            tag: 'pre',
            props: { class: 'stiljs-pre' }
        }
    ],
}, body)
export const pre = plane.querySelector('.stiljs-pre')!
export const tagName = plane.querySelector('.stiljs-tag-name')!
export const tips = createElement({ tag: 'div', props: { class: 'stiljs-tips' } }, body)
export function Tip(content: string, delay: number) {
    tips.textContent = content
    tips.style.top = '20px'
    setTimeout(() => { tips.style.top = '-100%' }, delay)
}
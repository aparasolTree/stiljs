import { plane, box, setStyle } from '../shared/element'
import { useElementBounding } from "../composition/useElementBounding"
import { useElementByPoint } from "../composition/useElementByPoint"
import { useElementStyleStr } from "../composition/useElementStyleStr"
import { useMouse } from "../composition/useMouse"
import { useWatch } from "../ref"
import { unrefElement } from "../shared/unrefElement"


const sheets = (function getSheets() {
    const sheets = []
    const links = document.querySelectorAll('link')
    for (let i = 0; i < links.length; i++) {
        let link = links[i]
        if (link.getAttribute('rel') === 'stylesheet') {
            sheets.push({
                prev: link.previousElementSibling,
                el: link,
                href: link.getAttribute('href')
            })
        }
    }

    return sheets
})()

console.log(sheets);


async function handleLink(sheets: any[], func: () => void) {
    const sheet = sheets.pop()
    if (!sheet) return func && func()
    const data = await fetch(sheet.href).then(res => res.text())
    const style = document.createElement('style')
    style.setAttribute('typs', 'text/css')
    style.textContent = data
    document.head.appendChild(style)
    sheet.el.remove()
    if (sheets.length === 0) {
        func && func()
    } else {
        handleLink(sheets, func)
    }
}

let StyleStr = ''

export interface ElStyleStartOptions {
    copy?: boolean
}

document.addEventListener('mouseleave', () => {
    plane.style.display = 'none';
    setStyle(box, {
        display: 'none',
    })
})

const elStyle = {
    start({ copy = true }: ElStyleStartOptions = {}) {
        handleLink(sheets, () => {
            const { x, y } = useMouse({ type: 'client' })
            const { element, pause, resume } = useElementByPoint({ x, y })
            const rect = useElementBounding(element)

            document.addEventListener('keydown', (event) => {
                if (event.key === 'a') {
                    resume()
                }
            })

            document.addEventListener('keyup', (event) => {
                if (event.key === 'a') {
                    pause()
                    element.value = null
                }
            })

            copy && elStyle.copy()

            useWatch(() => unrefElement(element), (el) => {
                if (el) {
                    setStyle(box, {
                        display: 'block',
                        left: `${rect.left.value}px`,
                        top: `${rect.top.value}px`,
                        width: `${rect.width.value}px`,
                        height: `${rect.height.value}px`,
                    })

                    const styleSheet = useElementStyleStr(el);
                    StyleStr = JSON.stringify(styleSheet, null, 2)
                    plane.style.display = 'block';
                    (plane.children[0] as HTMLPreElement).innerText = StyleStr
                } else {
                    plane.style.display = 'none';
                    setStyle(box, {
                        display: 'none',
                    })
                }
            })
        })
    },
    copy() {
        window.addEventListener("keydown", async event => {
            if (event.key === 'c') {
                if (StyleStr && StyleStr !== "{}") {
                    try {
                        await navigator.clipboard.writeText(joinObject(JSON.parse(StyleStr)))
                        alert('🆗')
                    } catch (error) {
                        console.log(error)
                    }
                }
            }
        })
    }
}

function joinObject(obj: object) {
    let _str = '{\n'
    Object.entries(obj).map(([key, value]) => {
        _str += `    ${key}: ${value};\n`
    })
    return _str + '}'
}

export default elStyle
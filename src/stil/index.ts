import { sheets } from '../shared/sheets'
import { handleLink } from '../shared/handlerLink'
import { plane, box, setStyle, tips, tagName, pre } from '../shared/element'
import { useElementBounding } from "../composition/useElementBounding"
import { useElementByPoint } from "../composition/useElementByPoint"
import { useElementStyleStr } from "../composition/useElementStyleStr"
import { useMouse } from "../composition/useMouse"
import { useWatch } from "../ref"
import { unrefElement } from "../shared/unrefElement"

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

const Stil = {
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
                    StyleStr = ''
                }
            })

            copy && Stil.copy()

            useWatch(() => unrefElement(element), (el) => {
                if (el) {
                    setStyle(box, {
                        display: 'block',
                        left: `${rect.left.value}px`,
                        top: `${rect.top.value}px`,
                        width: `${rect.width.value}px`,
                        height: `${rect.height.value}px`,
                    })

                    plane.style.display = 'block';
                    tagName.textContent = el.nodeName.toLocaleLowerCase()

                    const styleSheet = useElementStyleStr(el);
                    StyleStr = JSON.stringify(styleSheet, null, 2)
                    pre.textContent = StyleStr
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
                        tips.textContent = 'copy success!!! 😄'
                        tips.style.top = '20px'
                    } catch (error) {
                        tips.textContent = 'copy error!!! (。・＿・。)ﾉI’m sorry~'
                        tips.style.top = '20px'
                    } finally {
                        setTimeout(() => { tips.style.top = '-100%' }, 2000)
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

export default Stil
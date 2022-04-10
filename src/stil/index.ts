import { sheets } from '../shared/sheets'
import { handleLink } from '../shared/handlerLink'
import { plane, box, setStyle, tagName, pre, Tip } from '../shared/element'
import { useElementBounding } from "../composition/useElementBounding"
import { useElementByPoint } from "../composition/useElementByPoint"
import { useElementStyleStr } from "../composition/useElementStyleStr"
import { useMouse } from "../composition/useMouse"
import { useWatch } from "../ref"
import { unrefElement } from "../shared/unrefElement"
import { handlerWheel } from '../shared/events'
import { joinObject } from '../shared/utils'

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
            Tip('sheetStyle loaded 😄', 2000)
            const { x, y } = useMouse({ type: 'client' })
            const { element, pause, resume } = useElementByPoint({ x, y })
            const rect = useElementBounding(element)

            document.addEventListener('keydown', (event) => {
                if (event.key === 'a') {
                    resume()
                    window.addEventListener("wheel", handlerWheel, { passive: false })
                }
            })

            document.addEventListener('keyup', (event) => {
                if (event.key === 'a') {
                    window.removeEventListener("wheel", handlerWheel)
                    pause()
                    element.value = null
                    StyleStr = ''
                }
            })

            copy && Stil.copy()

            useWatch(() => unrefElement(element), (el) => {
                if (el) {
                    plane.scrollTop = 0
                    plane.scrollLeft = 0
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
                        Tip('copy success!!! 😄', 2000)
                    } catch (error) {
                        Tip('copy error!!! (。・＿・。)ﾉI’m sorry~', 2000)
                    }
                }
            }
        })
    }
}



export default Stil
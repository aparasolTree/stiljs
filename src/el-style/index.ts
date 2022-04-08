import { plane, box, point, setStyle } from '../shared/element'
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
    point.style.display = 'none';
    setStyle(box, {
        display: 'none',
    })
})

document.addEventListener('mouseenter', () => {
    point.style.display = 'block';
})

const elStyle = {
    start({ copy = true }: ElStyleStartOptions = {}) {
        const { x, y } = useMouse({ type: 'client' })
        const { element } = useElementByPoint({ x, y })
        const rect = useElementBounding(element)

        copy && elStyle.copy()

        useWatch(() => [x.value, y.value], () => {
            point.style.left = `${x.value - 2}px`
            point.style.top = `${y.value - 2}px`
        })

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
    },
    copy() {
        window.addEventListener("keydown", async event => {
            if (event.ctrlKey && event.shiftKey && event.key === 'c') {
                if (StyleStr && StyleStr !== "{}") {
                    try {
                        await navigator.clipboard.writeText(joinObject(JSON.parse(StyleStr)))
                        alert('🆗')
                    } catch (error) {
                        console.log(error);
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
import { plane, pre } from "./element"

export const handlerWheel = (event: WheelEvent) => {
    event.stopPropagation()
    event.preventDefault()
    if (
        pre.scrollHeight > plane.clientHeight
        || pre.scrollWidth > plane.clientWidth
    ) {
        if (event.ctrlKey) {
            if (event.deltaY > 0) {
                plane.scrollLeft += 20
            } else {
                plane.scrollLeft -= 20
            }
        } else {
            if (event.deltaY > 0) {
                plane.scrollTop += 20
            } else {
                plane.scrollTop -= 20
            }
        }
    }
}
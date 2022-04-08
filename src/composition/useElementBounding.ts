import { ref, useWatch } from "../ref"
import { unrefElement } from "../shared/unrefElement"
import { MaybeElementRef } from "../type"
import { useResizeObserver } from "./useResizeObserver"

export function useElementBounding(target: MaybeElementRef) {
    const height = ref(0), width = ref(0), left = ref(0), right = ref(0),
        top = ref(0), bottom = ref(0), x = ref(0), y = ref(0)

    function updateSize() {
        const el = unrefElement(target)
        if (!el) {
            height.value = 0
            bottom.value = 0
            left.value = 0
            right.value = 0
            top.value = 0
            width.value = 0
            x.value = 0
            y.value = 0
            return
        }

        const rect = el.getBoundingClientRect()
        height.value = rect.height
        bottom.value = rect.bottom
        left.value = rect.left
        right.value = rect.right
        top.value = rect.top
        width.value = rect.width
        x.value = rect.x
        y.value = rect.y
    }

    window.addEventListener('scroll', updateSize, true)
    useResizeObserver(target, updateSize)

    useWatch(() => unrefElement(target), () => {
        updateSize()
    })

    return {
        height, bottom, top, left, right, width, x, y, updateSize
    }
}

export type UseElementBoundingReturn = ReturnType<typeof useElementBounding>
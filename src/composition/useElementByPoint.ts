import type { Ref } from "../ref"
import { ref, unref } from "../ref"
import { useRafFn } from "./useRaf"
export interface UseElementByPointOptions {
    x: Ref<number>,
    y: Ref<number>
}

export function useElementByPoint(options: UseElementByPointOptions) {
    const element = ref<HTMLElement | null>(null)
    const { x, y } = options

    const control = useRafFn(() => {
        const el = document.elementFromPoint(unref(x), unref(y)) as HTMLElement | null
        if (el) {
            if (['BODY', "HTML"].includes(el!.nodeName)) return
            element.value = el
        }
    }, { immediate: false })

    return {
        element,
        ...control
    }
}

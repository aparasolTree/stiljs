import { ref } from "../ref"
import { Fn } from "../type"

export interface RafOptions {
    immediate?: boolean
}

export function useRafFn(fn: Fn, options: RafOptions = {}) {
    const isActive = ref(false)

    const loop = () => {
        if (!isActive.value) return
        fn()
        window.requestAnimationFrame(loop)
    }

    const resume = () => {
        if (!isActive.value) {
            isActive.value = true
            loop()
        }
    }

    const pause = () => isActive.value = false

    if (options.immediate) resume()

    return { isActive, pause, resume }
}
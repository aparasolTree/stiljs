import { ref } from "../ref"
import { MouseSourceType, Position } from "../type"

export interface UseMouseOptions {
    type?: 'page' | 'client'
    touch?: boolean
    initialValue?: Position
    resetOnTouochEnd?: boolean
}

export function useMouse(options: UseMouseOptions = {}) {
    const {
        initialValue = { x: 0, y: 0 },
        type = 'page',
        touch = true,
        resetOnTouochEnd = true
    } = options

    const x = ref<number>(0)
    const y = ref<number>(0)
    const sourceType = ref<MouseSourceType>(null)

    const mouseHandler = (event: MouseEvent) => {
        if (type === 'page') {
            x.value = event.pageX
            y.value = event.pageY
        } else if (type === 'client') {
            x.value = event.clientX
            y.value = event.clientY
        }

        sourceType.value = 'mouse'
    }

    const reset = () => {
        y.value = initialValue.x
        x.value = initialValue.y
    }

    const touchHandler = (event: TouchEvent) => {
        if (event.touches.length > 0) {
            const touch = event.touches[0]
            if (type === 'page') {
                x.value = touch.pageX
                y.value = touch.pageY
            } else if (type === 'client') {
                x.value = touch.clientX
                y.value = touch.clientY
            }

            sourceType.value = 'touch'
        }
    }

    if (window) {
        window.addEventListener('mousemove', mouseHandler, { passive: true })
        window.addEventListener('dragover', mouseHandler, { passive: true })
        if (touch) {
            window.addEventListener('touchstart', touchHandler, { passive: true })
            window.addEventListener('touchmove', touchHandler, { passive: true })
            if (resetOnTouochEnd) {
                window.addEventListener('touchend', reset, { passive: true })
            }
        }
    }

    return {
        x, y, sourceType
    }
}

import { useWatch } from "../ref";
import { unrefElement } from "../shared/unrefElement";
import { MaybeElementRef } from "../type";

export function useResizeObserver(target: MaybeElementRef, callback: ResizeObserverCallback, options: ResizeObserverOptions = {}) {
    const isSupported = Boolean(window && 'ResizeObserver' in window)
    let observer: ResizeObserver | undefined

    const cleanup = () => {
        if (observer) {
            observer.disconnect()
            observer = (void 0)
        }
    }

    const stopWatch = useWatch(
        () => unrefElement(target),
        (el) => {
            cleanup()
            if (isSupported && window && el) {
                observer = new ResizeObserver(callback)
                observer.observe(el, options)
            }
        },
        { immediate: true }
    )

    const stop = () => {
        cleanup()
        stopWatch()
    }

    return {
        isSupported, stop
    }
}

export type UseResizeObserverReturn = ReturnType<typeof useResizeObserver>
// 很烂，but能跑
let activeEffect: EffectFn | null = null
const bucket = new Map<string | symbol, Set<EffectFn>>()
const effectStack = [] as EffectFn[]

export function isRef<T>(r: Ref<T> | unknown): r is Ref<T>
export function isRef(r: any): r is Ref {
    return !!(r && r._isRef === true)
}

export interface Ref<T = any> {
    value: T
    _isRef: true
}

// 只支持简单类型参数
export function ref<T>(value: T): Ref<T>
export function ref(value?: unknown) {
    const _symbol = Symbol()
    return {
        get value() {
            track(_symbol)
            return value
        },
        set value(v) {
            if (value === v) {
                return
            }
            value = v
            trigger(_symbol)
        },
        _isRef: true
    }
}

export function unref<T>(ref: T | Ref<T>): T {
    return isRef(ref) ? (ref.value as any) : ref
}

function track(key: string | symbol) {
    if (!activeEffect) return
    let depsSet: Set<EffectFn> | undefined = bucket.get(key)
    if (!depsSet) {
        bucket.set(key, (depsSet = new Set<EffectFn>()))
    }
    depsSet.add(activeEffect)
    activeEffect.deps!.push(depsSet)
}

function trigger(key: string | symbol) {
    const effects = bucket.get(key)
    if (!effects) return
    const newDeps = new Set<EffectFn>()
    effects && effects.forEach(fn => {
        if (fn !== activeEffect) {
            newDeps.add(fn);
        }
    })
    newDeps.forEach(fn => fn(fn.fn?.()))
}

function clean(effectFn: any) {
    for (let i = 0; i < effectFn.deps; i++) {
        const deps = effectFn.deps[i]
        deps.delete(effectFn)
    }
}

export interface EffectFn<T = any> {
    (el?: T): any,
    deps?: Set<EffectFn>[]
    fn?: () => T
}

export interface UseWatchOptions { immediate?: boolean }
export function useWatch<T>(fn: () => T, effectFn: EffectFn<T>, options: UseWatchOptions = {}) {
    const { immediate = true } = options
    function _effect() {
        clean(effectFn)
        activeEffect = effectFn
        effectStack.push(effectFn)
        fn()
        effectStack.pop()
        activeEffect = effectStack[effectStack.length - 1]
    }
    if (immediate) effectFn()

    effectFn.deps = []
    effectFn.fn = fn
    _effect()

    return () => clean(effectFn)
}
import type { Ref } from "./ref"

export type Fn = () => void

export interface Position {
    x: number
    y: number
}

export type MouseSourceType = 'mouse' | 'touch' | null

export type MaybeRef<T> = T | Ref<T>
export type MaybeElement = HTMLElement | SVGElement | undefined | null
export type MaybeElementRef<T extends MaybeElement = MaybeElement> = MaybeRef<T>


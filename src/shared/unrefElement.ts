import { unref } from "../ref";
import { MaybeElement, MaybeElementRef } from "../type";

export function unrefElement<T extends MaybeElement>(elRef: MaybeElementRef<T>): MaybeElement {
    return unref(elRef)
}
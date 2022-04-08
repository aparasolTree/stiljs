import { unrefElement } from "../shared/unrefElement"
import { MaybeElementRef } from "../type"

export function useElementStyleStr(element: MaybeElementRef) {
    const target = unrefElement(element)
    let sheets = document.styleSheets
    const StyleSheet: any = {}
    const computedStyle = window.getComputedStyle(target!)

    for (let sheet in sheets) {
        let rules = sheets[sheet].cssRules
        for (let r in rules) {
            let rule = rules[r] as CSSStyleRule
            let style = rule.style

            if (target!.matches(rule.selectorText)) {
                for (let i = 0; i < style.length; i++) {
                    StyleSheet[style[i]] = computedStyle.getPropertyValue(style[i])
                }
            }
        }
    }

    const styleAttr = target?.getAttribute('style')
    if (styleAttr) {
        const styleList = styleAttr.split(';')
        for (let i = 0; i < styleList.length; i++) {
            const [key, value] = styleList[i].split(':')
            if (key && value) {
                StyleSheet[key.trim()] = value.trim()
            }
        }
    }

    return StyleSheet
}
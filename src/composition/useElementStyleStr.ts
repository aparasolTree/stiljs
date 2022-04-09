import { unrefElement } from "../shared/unrefElement"
import { MaybeElementRef } from "../type"

const border = { left: true, top: true, right: true, bottom: true } as any

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
                    if (style[i].startsWith('--')) continue
                    let value = computedStyle.getPropertyValue(style[i])
                    if (style[i].startsWith('border')) {
                        const match = style[i].match(/-([a-z]+)-/)
                        if (match) {
                            let direction = match[1]
                            if (parseFloat(value) == 0) {
                                border[direction] = false
                            }
                            if (!border[direction]) continue
                        }
                    }
                    if (value.endsWith('px') && parseFloat(value) == 0) continue
                    StyleSheet[style[i]] = value
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
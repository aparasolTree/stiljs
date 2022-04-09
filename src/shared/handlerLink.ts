export async function handleLink(sheets: any[], func: () => void) {
    const sheet = sheets.pop()
    if (!sheet) return func && func()
    const data = await fetch(sheet.href).then(res => res.text())
    const style = document.createElement('style')
    style.setAttribute('typs', 'text/css')
    style.textContent = data
    document.head.appendChild(style)
    sheet.el.remove()
    if (sheets.length === 0) {
        func && func()
    } else {
        handleLink(sheets, func)
    }
}

export const sheets = (function getSheets() {
    const sheets = []
    const links = document.querySelectorAll('link')
    for (let i = 0; i < links.length; i++) {
        let link = links[i]
        if (link.getAttribute('rel') === 'stylesheet') {
            sheets.push({
                prev: link.previousElementSibling,
                el: link,
                href: link.getAttribute('href')
            })
        }
    }

    return sheets
})()
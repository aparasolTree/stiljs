export function joinObject<T extends object>(obj: T) {
    let _str = '{\n'
    Object.entries(obj).map(([key, value]) => {
        _str += `    ${key}: ${value};\n`
    })
    return _str + '}'
}
export default (items, callback) => {
    let array = []
    for (var i = 0, length = items.length; i < length; i++) {
        const value = callback(items[i], i)
        if ([null, undefined].indexOf(value) === -1) {
            array.push(value)
        }
    }

    return array
}

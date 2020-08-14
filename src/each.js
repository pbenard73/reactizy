export default (items, callback) => {
    for (var i = 0, length = items.length; i < length; i++) {
        callback(items[i], i)
    }
}

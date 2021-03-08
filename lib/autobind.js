import each from "./each"

export default function (extra = []) {
    const properties = Object.getOwnPropertyNames(this)
        .concat(Object.getOwnPropertyNames(this.__proto__))
        .concat(extra)

    each(properties, property => {
        const suffix = "BindThis"
        const index = property.length - suffix.length

        if (property.indexOf(suffix) === index && index > 0) {
            this[property.replace(suffix, "")] = this[property].bind(this)
        }
    })
}

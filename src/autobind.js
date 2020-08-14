import each from "./each"

export default function () {
    const properties = Object.getOwnPropertyNames(this).concat(Object.getOwnPropertyNames(this.__proto__))

    each(properties, property => {
        const suffix = "BindThis"
        const index = property.length - suffix.length

        if (property.indexOf(suffix) === index && index > 0) {
            const cleanName = property.replace(suffix, "")
            this[cleanName] = this[property].bind(this)
        }
    })
}

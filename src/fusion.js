import each from "./each"

export default function (...parts) {
    var self = this

    each(parts, part => {
        const properties = Object.getOwnPropertyNames(part).concat(Object.getOwnPropertyNames(part.__proto__))

        each(properties, property => {
            if (property === "constructor") {
                return
            }

            if (property === "reduxers") {
                return
            }

            if (property === "state") {
                const state = part.state
                self.state = { ...self.state, ...state }

                return
            }

            if (typeof part[property] === "function") {
                self[property] = part[property].bind(self)
            } else {
                self[property] = part[property]
            }
        })
    })
}

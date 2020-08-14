import each from "./each"

export default function (...parts) {
    var self = this

    each(parts, part => {
        const properties = Object.getOwnPropertyNames(part).concat(Object.getOwnPropertyNames(part.__proto__))

        if (part.reduxers !== undefined) {
            let current = self.constructor.reduxers

            current = current === undefined ? [[], []] : current

            current = [current[0] === undefined ? [] : current[0], current[1] === undefined ? [] : current[1]]

            let state = part.reduxers[0]
            state = state === undefined ? [] : state
            state = state.filter(item => current[0].indexOf(item) === -1)

            let actions = part.reduxers[1]
            actions = actions === undefined ? [] : actions
            actions = actions.filter(item => current[1].indexOf(item) === -1)

            current[0] = current[0].concat(state)
            current[1] = current[1].concat(actions)

            self.constructor.reduxers = current
        }

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

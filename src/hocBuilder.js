import map from "./map"

import { compose } from "redux"

import withReactizy from "./highOrderComponent"

export default pool => (...args) => {
    return (Component, ...fusion) => {
        if (args.length === 0) {
            return withReactizy(Component, ...fusion)
        }

        const isHocFirst = pool[args[0][0]] !== undefined
        const isArray = subject => subject.constructor.name.toLowerCase() === "array"
        const reduxerArgs = givenArgs =>
            isArray(givenArgs[0]) === true && isArray(givenArgs[0][0]) === true ? givenArgs[0] : [...givenArgs]

        const checkReduxers = (GivenComponent, givenArgs) => {
            if (isArray(givenArgs[0]) === true) {
                GivenComponent.reduxers = givenArgs
            } else {
                GivenComponent.reduxers = [[...givenArgs[0]], givenArgs[1] !== undefined ? [...givenArgs[1]] : []]
            }

            return withReactizy(GivenComponent, ...fusion)
        }

        if (isHocFirst === true && args.length === 1) {
            const uses = map(args, item => (pool[item] === undefined ? null : pool[item]))

            return compose(...uses)(withReactizy(Component, ...fusion))
        } else if (isHocFirst === true && args.length > 1) {
            let [use, ...rest] = args

            const uses = map(use, item => (pool[item] === undefined ? null : pool[item]))

            return compose(...uses)(checkReduxers(Component, reduxerArgs(rest)))
        } else {
            return checkReduxers(Component, reduxerArgs(args))
        }
    }
}

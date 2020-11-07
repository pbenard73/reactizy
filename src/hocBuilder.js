import map from "./map"

import { compose } from "redux"

import withReactizy from "./highOrderComponent"
import hocCreator from "./hocCreator"

export default (pool = {}, buildable = {}) => (...args) => {
    const keyPool = Object.keys({ ...pool, ...buildable })

    return (Component, ...fusion) => {
        if (args.length === 0) {
            return withReactizy(Component, ...fusion)
        }

        const isHocFirst = keyPool.indexOf(args[0][0]) !== -1
        const isArray = subject => subject.constructor.name.toLowerCase() === "array"
        const reduxerArgs = givenArgs =>
            isArray(givenArgs[0]) === true && isArray(givenArgs[0][0]) === true ? givenArgs[0] : [...givenArgs]

        let usesReduxers = [[], []]

        const checkReduxers = (GivenComponent, givenArgs) => {
            GivenComponent.reduxers = [
                [...givenArgs[0], ...usesReduxers[0]],
                givenArgs[1] !== undefined ? [...givenArgs[1], ...usesReduxers[1]] : usesReduxers[1],
            ]

            return withReactizy(GivenComponent, ...fusion)
        }

        const getUses = givenArgs => {
            return map(args, item => {
                if (pool[item] !== undefined) {
                    return pool[item]
                }

                if (buildable[item] !== undefined) {
                    const buildableData = buildable[item]

                    if (isArray(buildableData) === false) {
                        return hocCreator(item, buildable[item])
                    }

                    let [method, states = [], actions = []] = buildableData
                    usesReduxers = [
                        [...usesReduxers[0], ...states],
                        [...usesReduxers[1], ...actions],
                    ]

                    return hocCreator(item, method)
                }

                return null
            })
        }

        if (isHocFirst === true && args.length === 1) {
            return compose(...getUses(args))(withReactizy(Component, ...fusion))
        }

        if (isHocFirst === true && args.length > 1) {
            let [use, ...rest] = args

            return compose(...getUses(use))(checkReduxers(Component, reduxerArgs(rest)))
        }

        return checkReduxers(Component, reduxerArgs(args))
    }
}

import { connect } from "react-redux"

import each from "./each"

export default function withReactizy(WrappedComponent, data = []) {
    if (typeof data !== "object" || data.constructor.name.toLowerCase() !== "array") {
        throw new Error(`First argument of 'withReactizy' must be an array`)
    }

    let staticState = WrappedComponent.constructor.reduxers
    staticState = staticState === undefined ? [[], []] : staticState

    if (staticState[1] === undefined) {
        staticState = [staticState[0], []]
    }
    let wantedStateProperties = data[0]
    wantedStateProperties = wantedStateProperties === undefined ? [] : wantedStateProperties
    wantedStateProperties = wantedStateProperties.concat(staticState[0])

    let wantedActions = data.length > 1 ? data[1] : []
    wantedActions = wantedActions.concat(staticState[1])

    const mapStateToProps = state => {
        let properties = {}

        each(wantedStateProperties, property => {
            properties[property] = state[property]
        })

        return properties
    }

    const mapActionsToProps = {}

    each(wantedActions, action => {
        mapActionsToProps[action] = payload => {
            return { type: action, payload }
        }
    })

    return connect(mapStateToProps, mapActionsToProps)(WrappedComponent)
}

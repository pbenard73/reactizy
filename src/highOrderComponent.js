import { connect } from "react-redux"

import each from "./each"
import autobind from "./autobind"

export default function withReactizy(WrappedComponent, ...parts) {
    let staticState = WrappedComponent.reduxers

    staticState = staticState === undefined ? [[], []] : staticState

    if (staticState[1] === undefined) {
        staticState = [staticState[0], []]
    }

    let wantedStateProperties = []
    wantedStateProperties = wantedStateProperties.concat(staticState[0])

    let wantedActions = []
    wantedActions = wantedActions.concat(staticState[1])

    let newState = {}
    let newMethods = {}

    each(parts, part => {
        const properties = Object.getOwnPropertyNames(part).concat(Object.getOwnPropertyNames(part.__proto__))

        if (part.reduxers !== undefined) {
            let state = part.reduxers[0]
            state = state === undefined ? [] : state
            state = state.filter(item => wantedStateProperties.indexOf(item) === -1)
            wantedStateProperties = [...wantedStateProperties, ...state]

            let actions = part.reduxers[1]
            actions = actions === undefined ? [] : actions
            actions = actions.filter(item => wantedActions.indexOf(item) === -1)
            wantedActions = [...wantedActions, ...actions]
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

                newState = { ...newState, ...state }

                return
            }

            newMethods[property] = part[property]
        })
    })

    let myComponent = WrappedComponent

    if (WrappedComponent.toString().indexOf("class") === 0) {
        myComponent = class Extended extends WrappedComponent {
            constructor(props) {
                super(props)
                this.state = this.state === undefined ? newState : { ...this.state, ...newState }

                each(Object.keys(newMethods), methodName => {
                    this[methodName] = newMethods[methodName]
                })

                autobind.call(this)
            }
        }
    }

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

    return connect(mapStateToProps, mapActionsToProps)(myComponent)
}

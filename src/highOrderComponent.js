import { connect } from "react-redux"

import each from "./each"
import autobind from "./autobind"

export default function withReactify(WrappedComponent, ...parts) {
    const isClass = WrappedComponent.toString().indexOf("class") === 0

    const baseProperties = Object.getOwnPropertyNames(WrappedComponent)
        .concat(Object.getOwnPropertyNames(WrappedComponent.__proto__))
        .concat(Object.getOwnPropertyNames(WrappedComponent.prototype))

    let staticState = WrappedComponent.reduxers

    const isArray = item =>
        [null, undefined].indexOf(staticState) === -1 && staticState.constructor.name.toLowerCase() === "array"

    staticState = isArray(staticState) === false || staticState.length === 0 ? [[], []] : staticState

    let pooler = {
        wantedStateProperties: isArray(staticState[0]) === false ? [] : staticState[0],
        wantedActions: staticState.length > 1 && isArray(staticState[1]) === true ? staticState[1] : [],
    }

    let newState = {}
    let newMethods = {}

    each(parts, part => {
        if (part.reduxers !== undefined) {
            each(["wantedStateProperties", "wantedActions"], (pool, i) => {
                let partialPool = part.reduxers[i]
                partialPool = partialPool === undefined ? [] : partialPool.filter(item => pooler[pool].indexOf(item) === -1)
                pooler[pool] = [...pooler[pool], ...partialPool]
            })
        }

        if (isClass === true) {
            const properties = Object.getOwnPropertyNames(part).concat(Object.getOwnPropertyNames(part.__proto__))

            each(properties, property => {
                if (["constructor", "reduxers"].indexOf(property) !== -1) {
                    return
                }

                if (property === "state") {
                    newState = { ...newState, ...part.state }

                    return
                }

                newMethods[property] = part[property]
            })
        }
    })

    let myComponent = WrappedComponent

    if (isClass === true) {
        myComponent = class Extended extends WrappedComponent {
            constructor(props) {
                super(props)
                this.state = this.state === undefined ? newState : { ...this.state, ...newState }

                each(Object.keys(newMethods), methodName => {
                    this[methodName] = newMethods[methodName]
                })

                autobind.call(this, baseProperties)
            }
        }
    }

    const mapStateToProps = state => {
        let properties = {}

        each(pooler.wantedStateProperties, property => {
            properties[property] = state[property]
        })

        return properties
    }

    const mapActionsToProps = {}

    each(pooler.wantedActions, action => {
        mapActionsToProps[action] = payload => {
            return { type: action, payload }
        }
    })

    let Component = connect(mapStateToProps, mapActionsToProps)(myComponent)

    return Component
}
